package org.west.backend.exceptions;


import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

public record ErrorResponseDTO(String apiPath, HttpStatus errorCode, String errorMsg, LocalDateTime timestamp) {
}
