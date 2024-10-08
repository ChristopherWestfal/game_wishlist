package org.west.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GameDto {
    private String name;
    private String released;
    private String note;
    private Boolean fav;
}
