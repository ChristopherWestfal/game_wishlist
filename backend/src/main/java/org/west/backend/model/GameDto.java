package org.west.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GameDto {
    String name;
    String releaseDate;
    String note;
    Boolean fav;
}
