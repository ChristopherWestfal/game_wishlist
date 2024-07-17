package org.west.backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.west.backend.model.WishedGame;
import org.west.backend.repository.WishlistRepository;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class WishedGameServiceTest {

    private final WishlistRepository mockWishlistRepository = mock(WishlistRepository.class);
    private final WishedGameService wishedGameService = new WishedGameService(mockWishlistRepository);
    private List<WishedGame> testData;


    @BeforeEach
    void setUp(){
        testData = List.of(
                new WishedGame("1", "The Legend of Zelda: Breath of the Wild", "2017-03-03", false),
                new WishedGame("2", "God of War", "2018-04-20", false),
                new WishedGame("3", "Red Dead Redemption 2", "2018-10-26", false)
        );
    }

    @Test
    void getAllGames_shouldReturnListOfAllGames_whenCalled() {
        // GIVEN
        List<WishedGame> expected = testData;
        when(mockWishlistRepository.findAll()).thenReturn(expected);

        // WHEN
        List<WishedGame> actual = wishedGameService.getAllGames();

        // THEN
        assertEquals(expected,actual);
        verify(mockWishlistRepository).findAll();
    }

    @Test
    void getAllGames_shouldReturnEmptyList_whenCalled() {
        // GIVEN
        List<WishedGame> expected = new ArrayList<>();
        when(mockWishlistRepository.findAll()).thenReturn(expected);

        // WHEN
        List<WishedGame> actual = wishedGameService.getAllGames();

        // THEN
        assertEquals(expected,actual);
        verify(mockWishlistRepository).findAll();
    }
}