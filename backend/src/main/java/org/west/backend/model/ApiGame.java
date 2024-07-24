package org.west.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ApiGame {
    private int id;
    private String name;
    private String released;
    private String background_image;
    private double rating;
    private double rating_top;
}
