package com.cognizant.spring_learn.controller;

import com.cognizant.spring_learn.model.AuthenticationResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import com.cognizant.spring_learn.util.JwtUtil;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@RestController
public class AuthenticationController {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(AuthenticationController.class);

    @GetMapping("/authenticate")
    public AuthenticationResponse authenticate(
            @RequestHeader("Authorization") String authHeader) {

        LOGGER.info("Start");

        String user = getUser(authHeader);

        LOGGER.debug("User: {}", user);

        String token = JwtUtil.generateToken(user);

        LOGGER.info("End");

        return new AuthenticationResponse(token);
    }

    private String getUser(String authHeader) {

        LOGGER.info("Inside getUser()");

        String encodedCredentials = authHeader.substring(6);

        byte[] decodedBytes =
                Base64.getDecoder().decode(encodedCredentials);

        String credentials =
                new String(decodedBytes, StandardCharsets.UTF_8);

        LOGGER.debug("Credentials: {}", credentials);

        return credentials.substring(0, credentials.indexOf(":"));
    }
}