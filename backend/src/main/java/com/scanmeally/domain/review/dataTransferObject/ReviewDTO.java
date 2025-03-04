package com.scanmeally.domain.review.dataTransferObject;


import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;


@Getter
@Setter
public class ReviewDTO {

    private String id;

    
    private String userId;

    
    private String storeId;

    private Integer rating;

    private String comment;

    

}
