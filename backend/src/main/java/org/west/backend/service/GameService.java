package org.west.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.west.backend.repository.GameRepository;

@Service
@RequiredArgsConstructor

public class GameService {
    private final GameRepository gameRepository;
}
