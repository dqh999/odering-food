package com.scanmeally.api.payment;

import com.scanmeally.domain.payment.dataTransferObject.PaymentDTO;
import com.scanmeally.domain.payment.service.PaymentService;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(value = "/api/payments", produces = MediaType.APPLICATION_JSON_VALUE)
public class PaymentResource {

    private final PaymentService paymentService;

    public PaymentResource(final PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping
    public ResponseEntity<List<PaymentDTO>> getAllPayments() {
        return ResponseEntity.ok(paymentService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentDTO> getPayment(@PathVariable(name = "id") final String id) {
        return ResponseEntity.ok(paymentService.get(id));
    }

    @PostMapping
    
    public ResponseEntity<String> createPayment(@RequestBody  final PaymentDTO paymentDTO) {
        final String createdId = paymentService.create(paymentDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updatePayment(@PathVariable(name = "id") final String id,
            @RequestBody  final PaymentDTO paymentDTO) {
        paymentService.update(id, paymentDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    
    public ResponseEntity<Void> deletePayment(@PathVariable(name = "id") final String id) {
        paymentService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
