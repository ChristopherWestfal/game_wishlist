package org.west.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.west.backend.model.Game;
import org.west.backend.service.ApiGameService;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ApiGameController {

    private final ApiGameService apiGameService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<Game> getAllGames(){
        return apiGameService.getAllGames();
    }
}
