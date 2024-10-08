package org.west.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.west.backend.exceptions.InvalidIdException;
import org.west.backend.model.Game;
import org.west.backend.service.GameService;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/wishlist")
    public List<Game> getAllGames(){
        return gameService.getAllGames();
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/wishlist/{id}")
    public void deleteGameById(@PathVariable int id){
        gameService.deleteGameById(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/wishlist")
    public Game postGame(@RequestBody Game newGame) {
        return gameService.postGame(newGame);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/wishlist")
    public Game putGame(@RequestParam int id, @RequestParam String note) throws InvalidIdException {
        return gameService.putGame(id, note);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/wishlist/search")
    public List<Game> getSearchedGames(@RequestParam String name) {
        return gameService.getSearchedGames(name);
    }
}
