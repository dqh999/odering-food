package com.scanmeally.domain.table.dataTransferObject;


import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;


@Getter
@Setter
public class QrCodeDTO {

    private String id;

    
    private String tableId;

    
    private String qrCode;

    private String url;

    

}
