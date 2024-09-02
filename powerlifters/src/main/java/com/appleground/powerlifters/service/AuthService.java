package com.appleground.powerlifters.service;

import org.springframework.http. ResponseEntity;
import com.appleground.powerlifters.dto.request.auth.SignInRequestDto;
import com.appleground.powerlifters.dto.request.auth.SignUpRequestDto;
import com.appleground.powerlifters.dto.response.auth.SignInResponseDto;
import com.appleground.powerlifters.dto.response.auth.SignUpResponseDto;

public interface AuthService {
    ResponseEntity<? super SignUpResponseDto> signUp(SignInRequestDto dto);
    // ResponseEntity‹? super SignUpResponseDto> signUp (SignUpRequestDto dto);
    ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);

}