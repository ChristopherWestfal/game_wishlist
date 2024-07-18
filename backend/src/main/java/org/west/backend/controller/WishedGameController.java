package org.west.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
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

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/wishlist/{id}")
    public void deleteGameById(@PathVariable String id){
        wishedGameService.deleteGameById(id);
    }
}
