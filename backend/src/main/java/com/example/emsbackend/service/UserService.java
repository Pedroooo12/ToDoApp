package com.example.emsbackend.service;


import com.example.emsbackend.dto.UserDto;
import com.example.emsbackend.entity.Tareas;
import com.example.emsbackend.entity.User;

import java.util.List;

public interface UserService {
    void saveUser(UserDto userDto);

    User findByEmail(String email);

    User findById(Long id);

    User updateUsuario(Long tareaId, User updatedUser);

    List<UserDto> findAllUsers();

    boolean validarPassword(String email,String password);

    void deleteUser(long id);
}
