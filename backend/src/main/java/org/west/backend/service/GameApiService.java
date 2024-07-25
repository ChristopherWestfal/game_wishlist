package org.west.backend.service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.west.backend.model.ApiResponse;

@AllArgsConstructor
@Service
public class GameApiService {

    private final RestClient restClient;

    @Value("${app.game.api}")
    private String baseUrl;

    private String nextUrl = "";
    private String prevUrl = baseUrl;


    public GameApiService(){
        restClient = RestClient.builder()
                .build();
    }

    public ApiResponse getAllApiGames() {
        ApiResponse response = restClient.get()
                .uri(baseUrl)
                .retrieve()
                .body(ApiResponse.class);

        if(response.getPrevious() != null) {
            prevUrl = response.getPrevious();
            response.setPrevious("1");
        }
        else
            response.setPrevious("");

        if(response.getNext() != null) {
            nextUrl = response.getNext();
            response.setNext("1");
        }
        else
            response.setNext("");


        return response;
    }


    public ApiResponse getAllApiGamesNext(){
        ApiResponse response = restClient.get()
                .uri(nextUrl)
                .retrieve()
                .body(ApiResponse.class);

        if(response.getPrevious() != null) {
            prevUrl = response.getPrevious();
            response.setPrevious("1");
        }
        else
            response.setPrevious("");

        if(response.getNext() != null) {
            nextUrl = response.getNext();
            response.setNext("1");
        }
        else
            response.setNext("");


        return response;
    }

    public ApiResponse getAllApiGamesPrev(){
        ApiResponse response = restClient.get()
                .uri(prevUrl)
                .retrieve()
                .body(ApiResponse.class);

        if(response.getPrevious() != null) {
            prevUrl = response.getPrevious();
            response.setPrevious("1");
        }
        else
            response.setPrevious("");

        if(response.getNext() != null) {
            nextUrl = response.getNext();
            response.setNext("1");
        }
        else
            response.setNext("");

        return response;
    }
}
