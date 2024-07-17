package org.west.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
public class Game {
    @Id
    String id;
    String name;
    String releaseDate;
    Boolean fav;
}
