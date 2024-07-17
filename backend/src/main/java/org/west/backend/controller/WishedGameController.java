package org.west.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.west.backend.model.WishedGame;
import org.west.backend.service.WishedGameService;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class WishedGameController {

    private final WishedGameService wishedGameService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/wishlist")
    public List<WishedGame> getAllGames(){
        return wishedGameService.getAllGames();
    }
}
