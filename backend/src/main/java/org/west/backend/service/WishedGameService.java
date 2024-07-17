package org.west.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.west.backend.model.WishedGame;
import org.west.backend.repository.WishlistRepository;

import java.util.List;

@Service
@RequiredArgsConstructor

public class WishedGameService {
    private final WishlistRepository wishlistRepository;

    public List<WishedGame> getAllGames() {
        return wishlistRepository.findAll();
    }
}
