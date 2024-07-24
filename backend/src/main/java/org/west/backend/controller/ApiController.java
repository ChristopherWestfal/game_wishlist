package org.west.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.west.backend.model.ApiGame;
import org.west.backend.service.GameApiService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ApiController {
    private final GameApiService gameApiService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/apigames")
    public List<ApiGame> getAllApiGames() throws IOException {
        return gameApiService.getAllApiGames();
    }
}
