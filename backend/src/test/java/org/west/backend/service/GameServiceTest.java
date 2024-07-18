package org.west.backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.west.backend.model.Game;
import org.west.backend.repository.GameRepository;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class GameServiceTest {

    private final GameRepository mockGameRepository = mock(GameRepository.class);
    private final GameService gameService = new GameService(mockGameRepository);
    private List<Game> testData;


    @BeforeEach
    void setUp(){
        testData = List.of(
                new Game("1", "The Legend of Zelda: Breath of the Wild", "2017-03-03", true),
                new Game("2", "God of War", "2018-04-20", true),
                new Game("3", "Red Dead Redemption 2", "2018-10-26", true)
        );
    }

    @Test
    void getAllGames_shouldReturnListOfAllGames_whenCalled() {
        // GIVEN
        List<Game> expected = testData;
        when(mockGameRepository.findAll()).thenReturn(expected);

        // WHEN
        List<Game> actual = gameService.getAllGames();

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
        List<Game> actual = gameService.getAllGames();

        // THEN
        assertEquals(expected,actual);
        verify(mockGameRepository).findAll();
    }

    @Test
    void getAllGames_shouldDeleteById_whenCalledWithId1() {
        // When
        gameService.deleteGameById("1");
        // THEN
        verify(mockGameRepository).deleteById("1");

    }

    @Test
    void postGame_shouldReturnGame_whenCalledWithGame(){
        // GIVEN
        Game expected = testData.getFirst();
        Game newItem = new Game("1", "The Legend of Zelda: Breath of the Wild", "2017-03-03", true);

        // WHEN & THEN
        when(mockGameRepository.save(any(Game.class))).thenReturn(expected);
        Game actual = gameService.postGame(newItem);

        assertEquals(expected, actual);
        verify(mockGameRepository).save(expected);
    }
}