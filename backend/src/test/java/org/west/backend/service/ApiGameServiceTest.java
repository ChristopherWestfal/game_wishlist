package org.west.backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.west.backend.model.Game;
import org.west.backend.repository.GameRepository;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ApiGameServiceTest {

    private final GameRepository mockGameRepository = mock(GameRepository.class);
    private List<Game> testData;


    @BeforeEach
    void setUp(){
        testData = List.of(
                new Game("1", "The Legend of Zelda: Breath of the Wild", "2017-03-03", false),
                new Game("2", "God of War", "2018-04-20", false),
                new Game("3", "Red Dead Redemption 2", "2018-10-26", false)
        );
    }

    @Test
    void getAllGames_shouldReturnListOfAllGames_whenCalled() {
        // GIVEN
        List<Game> expected = testData;
        when(mockGameRepository.findAll()).thenReturn(expected);

        // WHEN
        List<Game> actual = mockGameRepository.findAll();

        // THEN
        assertEquals(expected,actual);
        verify(mockGameRepository).findAll();
    }

    @Test
    void getAllGames_shouldReturnEmptyList_whenCalled() {
        // GIVEN
        List<Game> expected = new ArrayList<>();
        when(mockGameRepository.findAll()).thenReturn(expected);

        // WHEN
        List<Game> actual = mockGameRepository.findAll();

        // THEN
        assertEquals(expected,actual);
        verify(mockGameRepository).findAll();
    }
}