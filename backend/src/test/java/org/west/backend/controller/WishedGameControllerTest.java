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
import org.west.backend.model.WishedGame;
import org.west.backend.repository.WishlistRepository;

import java.util.List;

import static org.mockito.Mockito.*;

@SpringBootTest
@AutoConfigureMockMvc
class WishedGameControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private WishlistRepository mockWishlistRepository;

    private List<WishedGame> gameTestData;

    @BeforeEach
    void setUp(){
        gameTestData = List.of(
                new WishedGame("1", "The Legend of Zelda: Breath of the Wild", "2017-03-03", true)
        );
    }

    @Test
    void getAllGames() throws Exception {
        when(mockWishlistRepository.findAll()).thenReturn(gameTestData);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/wishlist"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                                                                [{
                                                                    name: "The Legend of Zelda: Breath of the Wild",
                                                                    releaseDate: "2017-03-03",
                                                                    fav: true
                                                                }]
                                                                """));
    }

    @Test
    void deleteGameById() throws Exception {
        doNothing().when(mockWishlistRepository).deleteById("1");

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/wishlist/1"))
                .andExpect(MockMvcResultMatchers.status().isOk());

        verify(mockWishlistRepository).deleteById("1");
    }
}