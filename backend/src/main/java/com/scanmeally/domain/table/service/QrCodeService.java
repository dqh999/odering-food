package com.scanmeally.domain.table.service;

import com.scan_meally.my_app.util.NotFoundException;
import com.scanmeally.domain.table.dataTransferObject.QrCodeDTO;
import com.scanmeally.domain.table.model.QrCode;
import com.scanmeally.domain.table.repository.QrCodeRepository;
import com.scanmeally.infrastructure.exception.AppException;
import com.scanmeally.infrastructure.exception.ResourceException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class QrCodeService {

    private final QrCodeRepository qrCodeRepository;

    public QrCodeService(final QrCodeRepository qrCodeRepository) {
        this.qrCodeRepository = qrCodeRepository;
    }

    public List<QrCodeDTO> findAll() {
        final List<QrCode> qrCodes = qrCodeRepository.findAll(Sort.by("id"));
        return qrCodes.stream()
                .map(qrCode -> mapToDTO(qrCode, new QrCodeDTO()))
                .toList();
    }

    public QrCodeDTO get(final String id) {
        return qrCodeRepository.findById(id)
                .map(qrCode -> mapToDTO(qrCode, new QrCodeDTO()))
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
    }

    public String create(final QrCodeDTO qrCodeDTO) {
        final QrCode qrCode = new QrCode();
        mapToEntity(qrCodeDTO, qrCode);
        return qrCodeRepository.save(qrCode).getId();
    }

    public void update(final String id, final QrCodeDTO qrCodeDTO) {
        final QrCode qrCode = qrCodeRepository.findById(id)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
        mapToEntity(qrCodeDTO, qrCode);
        qrCodeRepository.save(qrCode);
    }

    public void delete(final String id) {
        qrCodeRepository.deleteById(id);
    }

    private QrCodeDTO mapToDTO(final QrCode qrCode, final QrCodeDTO qrCodeDTO) {
        qrCodeDTO.setId(qrCode.getId());
        qrCodeDTO.setTableId(qrCode.getTableId());
        qrCodeDTO.setQrCode(qrCode.getQrCode());
        qrCodeDTO.setUrl(qrCode.getUrl());
        return qrCodeDTO;
    }

    private QrCode mapToEntity(final QrCodeDTO qrCodeDTO, final QrCode qrCode) {
        qrCode.setTableId(qrCodeDTO.getTableId());
        qrCode.setQrCode(qrCodeDTO.getQrCode());
        qrCode.setUrl(qrCodeDTO.getUrl());
        return qrCode;
    }

}
