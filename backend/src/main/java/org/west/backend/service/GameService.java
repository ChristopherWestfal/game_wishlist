package org.west.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.west.backend.exceptions.InvalidIdException;
import org.west.backend.model.Game;
import org.west.backend.repository.GameRepository;


import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GameService {
    private final GameRepository gameRepository;

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public void deleteGameById(int id) {
        gameRepository.deleteById(id);
    }

    public Game postGame(Game newGame) {
        Optional<Game> go = gameRepository.findById(newGame.getId());

        if (go.isEmpty())
            return gameRepository.save(newGame);
        else
            throw new IllegalArgumentException("A game with this ID already exists.");
    }

    public Game putGame(int id, String note) throws InvalidIdException {
        Game foundGame = gameRepository.findById(id).orElseThrow(() -> new InvalidIdException("Game with Id " + id + " not found"));

        foundGame.setNote(note);

        return gameRepository.save(foundGame);
    }

    public List<Game> getSearchedGames(String name) {
        return gameRepository.findByName(name);
    }
}
