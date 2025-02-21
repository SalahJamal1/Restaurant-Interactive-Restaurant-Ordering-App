package com.app.restaurant.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Date;

@ControllerAdvice
public class HandelException {
    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handelException(UsernameNotFoundException exc) {
        ErrorResponse error = ErrorResponse.builder()
                .message(exc.getMessage())
                .status(HttpStatus.NOT_FOUND.value())
                .timestamp(new Date()).build();

        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handelException(Exception exc) {
        ErrorResponse error = ErrorResponse.builder()
                .message(exc.getMessage())
                .status(HttpStatus.BAD_REQUEST.value())
                .timestamp(new Date()).build();

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}
