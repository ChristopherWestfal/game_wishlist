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
    String id;
    String name;
    String releaseDate;
    String note;
    Boolean fav;
}
