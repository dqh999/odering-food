package com.scanmeally.infrastructure.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileService {
    private final Cloudinary cloudinary;

    public String uploadImage(MultipartFile file)  {
        try {
            if (file.isEmpty()) {
                throw new IllegalArgumentException("File is empty");
            }

            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            return uploadResult.get("secure_url").toString();
        } catch (IOException e) {
            log.error("Failed to upload image: {}", e.getMessage());
            throw new RuntimeException("Failed to upload image", e);
        } catch (IllegalArgumentException e) {
            log.warn("Invalid file: {}", e.getMessage());
            throw e;
        }
    }
}
