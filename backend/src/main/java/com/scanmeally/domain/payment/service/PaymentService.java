package com.scanmeally.domain.payment.service;

import com.scan_meally.my_app.util.NotFoundException;
import com.scanmeally.domain.payment.dataTransferObject.PaymentDTO;
import com.scanmeally.domain.payment.model.Payment;
import com.scanmeally.domain.payment.repository.PaymentRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(final PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public List<PaymentDTO> findAll() {
        final List<Payment> payments = paymentRepository.findAll(Sort.by("id"));
        return payments.stream()
                .map(payment -> mapToDTO(payment, new PaymentDTO()))
                .toList();
    }

    public PaymentDTO get(final String id) {
        return paymentRepository.findById(id)
                .map(payment -> mapToDTO(payment, new PaymentDTO()))
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
    }

    public String create(final PaymentDTO paymentDTO) {
        final Payment payment = new Payment();
        mapToEntity(paymentDTO, payment);
        return paymentRepository.save(payment).getId();
    }

    public void update(final String id, final PaymentDTO paymentDTO) {
        final Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new AppException(ResourceException.ENTITY_NOT_FOUND));
        mapToEntity(paymentDTO, payment);
        paymentRepository.save(payment);
    }

    public void delete(final String id) {
        paymentRepository.deleteById(id);
    }

    private PaymentDTO mapToDTO(final Payment payment, final PaymentDTO paymentDTO) {
        paymentDTO.setId(payment.getId());
        paymentDTO.setOrderId(payment.getOrderId());
        paymentDTO.setPaymentMethod(payment.getPaymentMethod());
        paymentDTO.setStatus(payment.getStatus());
        paymentDTO.setPaidAt(payment.getPaidAt());
        paymentDTO.setCreatedAt(payment.getCreatedAt());
        paymentDTO.setUpdatedAt(payment.getUpdatedAt());
        return paymentDTO;
    }

    private Payment mapToEntity(final PaymentDTO paymentDTO, final Payment payment) {
        payment.setOrderId(paymentDTO.getOrderId());
        payment.setPaymentMethod(paymentDTO.getPaymentMethod());
        payment.setStatus(paymentDTO.getStatus());
        payment.setPaidAt(paymentDTO.getPaidAt());
        payment.setCreatedAt(paymentDTO.getCreatedAt());
        payment.setUpdatedAt(paymentDTO.getUpdatedAt());
        return payment;
    }

}
