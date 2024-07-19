package org.west.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@Document("games")
public class Game {
    @Id
    private String id;
    private String name;
    private String releaseDate;
    private String note;
    private Boolean fav;
}
