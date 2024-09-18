package com.appleground.powerlifters.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.appleground.powerlifters.dto.response.ResponseDto;

@RestControllerAdvice
public class BadRequestExceptionHandler {
    @ExceptionHandler({MethodArgumentNotValidException.class, HttpMessageNotReadableException.class})    
    public ResponseEntity<ResponseDto> validationExceptionHaldler(Exception exception) {
        return ResponseDto.validationFailed();
    }
}
