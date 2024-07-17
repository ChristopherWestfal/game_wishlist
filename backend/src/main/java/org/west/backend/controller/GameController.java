package org.west.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.west.backend.model.Game;
import org.west.backend.service.GameService;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<Game> getAllGames(){
        return gameService.getAllGames();
    }
}
