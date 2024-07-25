package org.west.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.west.backend.model.ApiResponse;

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
        System.out.println(response.getNext());
        System.out.println(response.getPrevious());

        prevUrl = response.getPrevious();
        nextUrl = response.getNext();

        return response;
    }


    public ApiResponse getAllApiGamesNext(){
        ApiResponse response = restClient.get()
                .uri(nextUrl)
                .retrieve()
                .body(ApiResponse.class);
        System.out.println(response.getNext());
        System.out.println(prevUrl);

        prevUrl = response.getPrevious();
        nextUrl = response.getNext();


        return response;
    }

    public ApiResponse getAllApiGamesPrev(){
        ApiResponse response = restClient.get()
                .uri(prevUrl)
                .retrieve()
                .body(ApiResponse.class);

        System.out.println(response.getNext());
        System.out.println(prevUrl);

        prevUrl = response.getPrevious();
        nextUrl = response.getNext();

        return response;
    }
}
