package org.west.backend.exceptions;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.west.backend.model.Game;
import org.west.backend.service.GameService;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class GlobalExceptionHandlerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GameService gameService;

    @Test
    public void testHandleNullPointerException() throws Exception {
        // Wenn der Service mit der Fake-Datenbank (Mockito) aufgerufen wird und ein Item vom Typ DtoItem hinzugefügt
        // wird eine Exception geworfen
        Mockito.when(gameService.postGame(Mockito.any(Game.class))).thenThrow(new NullPointerException("This is a NullPointerException"));

        // Fake-Post auf route /api/add
        mockMvc.perform(MockMvcRequestBuilders.post("/api/wishlist")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"testGame\"}"))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.errorMsg").value("This is a NullPointerException"))
                .andExpect(jsonPath("$.errorCode").value("INTERNAL_SERVER_ERROR"))
                .andExpect(jsonPath("$.timestamp").exists())
                .andExpect(jsonPath("$.apiPath").exists());
    }

    @Test
    public void testHandleIdNotFoundException() throws Exception {
        // Wenn der Service mit der Fake-Datenbank (Mockito) aufgerufen wird und ein Item vom Typ DtoItem hinzugefügt
        // wird eine Exception geworfen
        Mockito.when(gameService.putGame(Mockito.any(Integer.class), Mockito.any(String.class))).thenThrow(new InvalidIdException("Game with ID 123 not found"));

        // Fake-Post auf route /api/add
        mockMvc.perform(MockMvcRequestBuilders.put("/api/wishlist")
                        .param("id", "123")
                        .param("note", "Test note")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.errorMsg").value("Game with ID 123 not found"))
                .andExpect(jsonPath("$.errorCode").value("NOT_FOUND"))
                .andExpect(jsonPath("$.timestamp").exists())
                .andExpect(jsonPath("$.apiPath").exists());
    }
}