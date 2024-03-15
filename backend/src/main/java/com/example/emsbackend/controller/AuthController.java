package com.example.emsbackend.controller;


import com.example.emsbackend.dto.UserDto;
import com.example.emsbackend.entity.User;
import com.example.emsbackend.response.LoginResponse;
import com.example.emsbackend.service.UserService;
import com.example.emsbackend.service.impl.UserServiceImpl;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

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
        User existing = userService.findByEmail(user.getEmail());

        if (result.hasErrors()) {
            return ResponseEntity.notFound().build();
        }

        if(existing != null){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(user);
        }

        userService.saveUser(user);
        return ResponseEntity.ok(user);
    }

    //LOGIN FUNCIONA
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody UserDto user, BindingResult result){

        User existing = userService.findByEmail(user.getEmail());

         if (existing == null) {
            // Usuario no encontrado
            return ResponseEntity.notFound().build();
        }

        // Comprobar la contraseña
        boolean comprobar = userService.validarPassword(user.getEmail(), user.getPassword());

        if (!comprobar) {
            // Usuario no encaja con la contraseña
            //return ResponseEntity.notFound().build();
            //return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(existing);

            return ResponseEntity.status(HttpStatus.CONFLICT).body(existing);
        }

        return ResponseEntity.ok(existing);

    }


    @PostMapping("/change/{id}")
    public ResponseEntity<User> changePassword(@PathVariable("id") Long id,@RequestBody User user, BindingResult result){
        User existing = userService.findById(id);
        userService.updateUsuario(id,user);

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


   @PostMapping("/logout")
   public ResponseEntity<Object> logout() {

       return ResponseEntity.ok(Map.of("message", "Sesión cerrada exitosamente"));
   }

    @DeleteMapping("/user/{id}")
    public void  deleteUser(@PathVariable("id") Long userId){

       userService.deleteUser(userId);
    }

}
