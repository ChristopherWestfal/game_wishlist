package org.west.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.west.backend.model.Game;
import org.west.backend.model.GameDto;
import org.west.backend.repository.GameRepository;

import java.util.List;

@Service
@RequiredArgsConstructor

public class GameService {
    private final GameRepository gameRepository;

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public void deleteGameById(String id) {
        gameRepository.deleteById(id);
    }

    public Game postGame(Game newGame) { return gameRepository.save(newGame); }

    public Game putGame(String id, GameDto gameDto) {
        Game foundGame = gameRepository.findById(id).orElseThrow();

        foundGame.setNote(gameDto.getNote());

        return foundGame;
    }
}
