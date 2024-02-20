package com.example.emsbackend.controller;


import com.example.emsbackend.dto.UserDto;
import com.example.emsbackend.entity.User;
import com.example.emsbackend.service.UserService;
import com.example.emsbackend.service.impl.UserServiceImpl;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private UserService userService;
    private UserServiceImpl userServiceImpl;

    public AuthController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@Valid @RequestBody UserDto user,
                                           BindingResult result){
        if (result.hasErrors()) {
            return ResponseEntity.notFound().build();
        }

        userService.saveUser(user);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody UserDto user, BindingResult result){
        User existing = userService.findByEmail(user.getEmail());

        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(existing);
    }

    @GetMapping("/checkAuth/{id}")
    public ResponseEntity<User> checkUser(@PathVariable("id") Long id){
        User existing = userService.findById(id);

        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(existing);
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout() {
        // invalidar la sesión o el token de autenticación si se está utilizando
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Sesion cerrada exitosamente");
    }
}
