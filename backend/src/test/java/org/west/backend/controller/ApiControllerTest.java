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
import org.west.backend.model.ApiResponse;
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

    private ApiResponse apiResponse;

    @BeforeEach
    void setUp(){
        List<ApiGame> gameTestData = List.of(
                new ApiGame(1, "The Legend of Zelda: Breath of the Wild", "2017-03-03", "", 4.5, 5)
        );

        apiResponse = new ApiResponse(gameTestData, "", "");
    }

    @Test
    void getAllApiGames() throws Exception {
        when(gameApiService.getAllApiGames()).thenReturn(apiResponse);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/apigames"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                                                                {"results": [{
                                                                    id: 1,
                                                                    name: "The Legend of Zelda: Breath of the Wild",
                                                                    released: "2017-03-03",
                                                                    background_image: "",
                                                                    rating: 4.5,
                                                                    rating_top: 5
                                                                }],
                                                                next: "",
                                                                previous: ""}
                                                                """));
    }

    @Test
    void getAllApiGamesPrev() throws Exception {
        when(gameApiService.getAllApiGamesPrev()).thenReturn(apiResponse);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/apigames/prev"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                                                                {"results": [{
                                                                    id: 1,
                                                                    name: "The Legend of Zelda: Breath of the Wild",
                                                                    released: "2017-03-03",
                                                                    background_image: "",
                                                                    rating: 4.5,
                                                                    rating_top: 5
                                                                }],
                                                                next: "",
                                                                previous: ""}
                                                                """));
    }

    @Test
    void getAllApiGamesNext() throws Exception {
        when(gameApiService.getAllApiGamesNext()).thenReturn(apiResponse);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/apigames/next"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                                                                {"results": [{
                                                                    id: 1,
                                                                    name: "The Legend of Zelda: Breath of the Wild",
                                                                    released: "2017-03-03",
                                                                    background_image: "",
                                                                    rating: 4.5,
                                                                    rating_top: 5
                                                                }],
                                                                next: "",
                                                                previous: ""}
                                                                """));
    }
}