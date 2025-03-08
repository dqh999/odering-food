package com.account.component;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.account.dataTransferObject.TokenDTO;
import com.account.dataTransferObject.TokenMetadataDTO;
import com.account.exception.AppException;
import com.account.exception.ResourceException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Component
public class JwtTokenProvider {
    @Value("${spring.security.jwt.secret-key}")
    private String secretKey;

    @Value("${spring.security.jwt.access-expiration}")
    private long accessTokenExpiration;

    @Value("${spring.security.jwt.refresh-expiration}")
    private long refreshTokenExpiration;

    private static final String CLAIM_USER_ID = "user_id";

    public TokenDTO generateTokens(TokenMetadataDTO tokenMetadata) {
        Date issuedAt = tokenMetadata.issuedAt();
        Date accessValidity = new Date(issuedAt.getTime() + accessTokenExpiration * 1000);
        Date refreshValidity = new Date(issuedAt.getTime() + refreshTokenExpiration * 1000);

        String accessToken = generateToken(tokenMetadata.userId(), tokenMetadata.userName(), issuedAt, accessValidity);
        String refreshToken = generateToken(tokenMetadata.userId(), null, issuedAt, refreshValidity);

        return new TokenDTO(tokenMetadata.userId(), accessToken, accessValidity, refreshToken, refreshValidity);
    }

    private String generateToken(String userId, String userName, Date issuedAt, Date expiration) {
        try {
            var claimsSetBuilder = new JWTClaimsSet.Builder()
                    .subject(userId)
                    .issuer("auth-service")
                    .issueTime(issuedAt)
                    .expirationTime(expiration)
                    .jwtID(UUID.randomUUID().toString());

            if (userName != null) {
                claimsSetBuilder.claim(CLAIM_USER_ID, userId);
            }

            JWSObject jwsObject = new JWSObject(
                    new JWSHeader(JWSAlgorithm.HS256),
                    new Payload(claimsSetBuilder.build().toJSONObject())
            );

            jwsObject.sign(new MACSigner(secretKey));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new AppException(ResourceException.UNEXPECTED_ERROR);
        }
    }

    public Optional<JWTClaimsSet> verifyToken(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            JWSObject jwsObject = JWSObject.parse(token);

            if (!jwsObject.verify(new MACVerifier(secretKey))) {
                return Optional.empty();
            }

            JWTClaimsSet claims = signedJWT.getJWTClaimsSet();
            Date expirationTime = claims.getExpirationTime();

            if (expirationTime != null && expirationTime.before(new Date())) {
                return Optional.empty();
            }

            return Optional.of(claims);
        } catch (ParseException | JOSEException e) {
            throw new AppException(ResourceException.UNEXPECTED_ERROR);
        }
    }
}
