package org.west.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.west.backend.model.ApiGame;
import org.west.backend.model.ApiResponse;

import java.io.IOException;
import java.util.List;


@Service
public class GameApiService {

    private final RestClient restClient;
    private String nextUrl, prevUrl;

    public GameApiService(@Value("${app.game.api}") String baseUrl){
        restClient = RestClient.builder()
                .baseUrl(baseUrl)
                .build();
    }

    public List<ApiGame> getAllApiGames() throws IOException {
        ApiResponse response = restClient.get()
                .retrieve()
                .body(ApiResponse.class);
        if(response != null) {
            return response.getResults();
        }
        else throw new IOException("No Games found!");
    }

//    public List<ApiGame> getAllApiGamesNext() throws IOException {
//        ApiResponse response = restClient.get()
//                .uri(nextUrl)
//                .retrieve()
//                .body(ApiResponse.class);
//        if(response != null) {
//            nextUrl = extractParams(response.getNext());
//            prevUrl = extractParams(response.getPrev());
//            return response.getResults();
//        }
//        else throw new IOException("No Games found!");
//    }
//
//    public List<ApiGame> getAllApiGamesPrev() throws IOException {
//        ApiResponse response = restClient.get()
//                .uri(prevUrl)
//                .retrieve()
//                .body(ApiResponse.class);
//        if(response != null) {
//            nextUrl = extractParams(response.getNext());
//            prevUrl = extractParams(response.getPrev());
//            return response.getResults();
//        }
//        else throw new IOException("No Games found!");
//    }
//
//    private String extractParams(String url) {
//        if (url == null) {
//            return null;
//        }
//        int index = url.indexOf('&');
//        return (index == -1) ? "" : url.substring(index);
//    }

}
