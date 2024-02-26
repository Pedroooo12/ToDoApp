package com.example.emsbackend.response;

import com.example.emsbackend.entity.User;

public class LoginResponse {
    private String status;
    private String message;
    private User user;

    // Constructores, getters y setters

    // Constructor para éxito
    public LoginResponse(String status, User user) {
        this.status = status;
        this.user = user;
    }

    // Constructor para errores
    public LoginResponse(String status, String message) {
        this.status = status;
        this.message = message;
    }
}
