package org.west.backend.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.west.backend.model.Game;
import org.west.backend.repository.GameRepository;

import java.util.List;

import static org.mockito.Mockito.when;

@SpringBootTest
@AutoConfigureMockMvc
class ApiGameControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GameRepository mockGameRepository;

    private List<Game> gameTestData;

    @BeforeEach
    void setUp(){
        gameTestData = List.of(
                new Game("1", "The Legend of Zelda: Breath of the Wild", "2017-03-03", false)
        );
    }

    @Test
    void getAllGames() throws Exception {
        when(mockGameRepository.findAll()).thenReturn(gameTestData);

        mockMvc.perform(MockMvcRequestBuilders.get("/api"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                                                                [{
                                                                    name: "The Legend of Zelda: Breath of the Wild",
                                                                    releaseDate: "2017-03-03",
                                                                    fav: false
                                                                }]
                                                                """));
    }
}