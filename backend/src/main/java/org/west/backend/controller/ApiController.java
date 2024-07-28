package org.west.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.west.backend.model.ApiResponse;
import org.west.backend.service.GameApiService;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ApiController {
    private final GameApiService gameApiService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/apigames")
    public ApiResponse getAllApiGames() {
        return gameApiService.getAllApiGames();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/apigames/next")
    public ApiResponse getAllApiGamesNext() {
        return gameApiService.getAllApiGamesNext();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/apigames/prev")
    public ApiResponse getAllApiGamesPrev() {
        return gameApiService.getAllApiGamesPrev();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/apigames/search")
    public ApiResponse getSearchedGames(@RequestParam String search) {
        return gameApiService.getSearchedGames(search);
    }
}
