package org.west.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.west.backend.model.Game;
import org.west.backend.repository.GameRepository;

import java.util.List;

@Service
@RequiredArgsConstructor

public class ApiGameService {
    private final GameRepository gameRepository;

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }
}
