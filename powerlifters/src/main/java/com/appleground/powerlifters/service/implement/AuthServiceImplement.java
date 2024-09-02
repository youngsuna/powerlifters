package com.appleground.powerlifters.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.appleground.powerlifters.dto.request.auth.SignUpRequestDto;
import com.appleground.powerlifters.repository.UserRepository;
import com.appleground.powerlifters.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService {
    
    private final UserRepository userRespository;
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder ();
    @Override
    public ResponseEntity<? super SignUpRequestDto> signUp(SignUpRequestDto dto) {
    
    
    }

}
