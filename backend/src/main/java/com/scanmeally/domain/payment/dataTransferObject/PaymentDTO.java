package com.scanmeally.domain.payment.dataTransferObject;



import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;


@Getter
@Setter
public class PaymentDTO {

    private String id;

    
    private String orderId;

    
    
    private String paymentMethod;

    
    private String status;

    private OffsetDateTime paidAt;

    

}
