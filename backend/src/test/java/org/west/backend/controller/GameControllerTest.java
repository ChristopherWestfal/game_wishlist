package org.west.backend.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.west.backend.model.Game;
import org.west.backend.repository.GameRepository;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

@SpringBootTest
@AutoConfigureMockMvc
class GameControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GameRepository mockGameRepository;

    private List<Game> gameTestData;

    @BeforeEach
    void setUp(){
        gameTestData = List.of(
                new Game("1", "The Legend of Zelda: Breath of the Wild", "2017-03-03", "", true)
        );
    }

    @Test
    void getAllGames() throws Exception {
        when(mockGameRepository.findAll()).thenReturn(gameTestData);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/wishlist"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                                                                [{
                                                                    name: "The Legend of Zelda: Breath of the Wild",
                                                                    released: "2017-03-03",
                                                                    fav: true
                                                                }]
                                                                """));
    }

    @Test
    void deleteGameById() throws Exception {
        doNothing().when(mockGameRepository).deleteById("1");

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/wishlist/1"))
                .andExpect(MockMvcResultMatchers.status().isOk());

        verify(mockGameRepository).deleteById("1");
    }

    @Test
    void addGame() throws Exception {
        when(mockGameRepository.save(gameTestData.getFirst())).thenReturn(gameTestData.getFirst());

        mockMvc.perform(MockMvcRequestBuilders.post("/api/wishlist")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                            {
                               "id": "1",
                               "name": "The Legend of Zelda: Breath of the Wild",
                               "released": "2017-03-03",
                               "note": "",
                               "fav": true
                            }
                        """))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.content().json("""
                            {
                               "id": "1",
                               "name": "The Legend of Zelda: Breath of the Wild",
                               "released": "2017-03-03",
                               "note": "",
                               "fav": true
                            }
                        """));
    }

    @Test
    void putGame() throws Exception {
        Game expected = new Game("1", "The Legend of Zelda: Breath of the Wild", "2017-03-03", "Test Note", true);
        when(mockGameRepository.findById("1")).thenReturn(Optional.ofNullable(gameTestData.getFirst()));
        when(mockGameRepository.save(any(Game.class))).thenReturn(expected);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/wishlist")
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("id", "1")
                        .param("note", "Test Note"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                            {
                               "id": "1",
                               "name": "The Legend of Zelda: Breath of the Wild",
                               "released": "2017-03-03",
                               "note": "Test Note",
                               "fav": true
                            }
                        """));
    }
}