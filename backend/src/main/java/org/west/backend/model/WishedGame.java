package org.west.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@Document("wishedgames")
public class WishedGame {
    @Id
    String id;
    String name;
    String releaseDate;
    Boolean fav;
}
