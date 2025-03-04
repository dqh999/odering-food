package com.scanmeally.api.table;

import com.scanmeally.domain.table.dataTransferObject.QrCodeDTO;
import com.scanmeally.domain.table.service.QrCodeService;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(value = "/api/qrCodes", produces = MediaType.APPLICATION_JSON_VALUE)
public class QrCodeResource {

    private final QrCodeService qrCodeService;

    public QrCodeResource(final QrCodeService qrCodeService) {
        this.qrCodeService = qrCodeService;
    }

    @GetMapping
    public ResponseEntity<List<QrCodeDTO>> getAllQrCodes() {
        return ResponseEntity.ok(qrCodeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<QrCodeDTO> getQrCode(@PathVariable(name = "id") final String id) {
        return ResponseEntity.ok(qrCodeService.get(id));
    }

    @PostMapping
    
    public ResponseEntity<String> createQrCode(@RequestBody  final QrCodeDTO qrCodeDTO) {
        final String createdId = qrCodeService.create(qrCodeDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateQrCode(@PathVariable(name = "id") final String id,
            @RequestBody  final QrCodeDTO qrCodeDTO) {
        qrCodeService.update(id, qrCodeDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    
    public ResponseEntity<Void> deleteQrCode(@PathVariable(name = "id") final String id) {
        qrCodeService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
