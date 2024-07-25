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
import org.west.backend.model.ApiGame;
import org.west.backend.service.GameApiService;

import java.util.List;

import static org.mockito.Mockito.when;

@SpringBootTest
@AutoConfigureMockMvc
class ApiControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GameApiService gameApiService;

    private List<ApiGame> gameTestData;

    @BeforeEach
    void setUp(){
        gameTestData = List.of(
                new ApiGame(1, "The Legend of Zelda: Breath of the Wild", "2017-03-03", "", 4.5, 5)
        );
    }

    @Test
    void getAllApiGames() throws Exception {
        when(gameApiService.getAllApiGames()).thenReturn(gameTestData);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/apigames"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                                                                [{
                                                                    id: 1,
                                                                    name: "The Legend of Zelda: Breath of the Wild",
                                                                    released: "2017-03-03",
                                                                    background_image: "",
                                                                    rating: 4.5,
                                                                    rating_top: 5
                                                                }]
                                                                """));
    }
}