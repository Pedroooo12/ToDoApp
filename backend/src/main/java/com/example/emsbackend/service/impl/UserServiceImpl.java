package com.example.emsbackend.service.impl;

import com.example.emsbackend.entity.Categoria;
import com.example.emsbackend.entity.Importancia;
import com.example.emsbackend.entity.Tareas;
import com.example.emsbackend.exception.ResourceNotFoundException;
import com.example.emsbackend.repository.CategoriaRepository;
import com.example.emsbackend.repository.ImportanciaRepository;
import com.example.emsbackend.repository.TareasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.emsbackend.dto.UserDto;
import com.example.emsbackend.entity.User;
import com.example.emsbackend.repository.UserRepository;
import com.example.emsbackend.service.UserService;
import org.springframework.stereotype.Service;

import javax.swing.*;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TareasRepository tareasRepository;

    @Autowired
    private ImportanciaRepository importanciaRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    public UserServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void saveUser(UserDto userDto) {
        User user = new User();
        user.setName(userDto.getFirstName() + " " + userDto.getLastName());
        user.setEmail(userDto.getEmail());

        //encrypt the password once we integrate spring security
        //user.setPassword(userDto.getPassword());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        userRepository.save(user);

        UserDto userSaved = convertEntityToDto(user);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User findById(Long id) {
        try {
            return userRepository.findById(id).orElseThrow(NoSuchElementException::new);
        } catch (NoSuchElementException e) {
            // Manejar la ausencia del usuario, puedes loggear un mensaje o lanzar tu propia excepción
            throw new NoSuchElementException("Usuario no encontrado con id: " + id);
        }
    }

    @Override
    public List<UserDto> findAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map((user) -> convertEntityToDto(user))
                .collect(Collectors.toList());
    }

    private UserDto convertEntityToDto(User user){
        UserDto userDto = new UserDto();
        String[] name = user.getName().split(" ");
        userDto.setFirstName(name[0]);
        userDto.setLastName(name[1]);
        userDto.setEmail(user.getEmail());
        return userDto;
    }

    public User convertDtoToEntity(UserDto userDto){
        User user = new User();
        user.setName(userDto.getFirstName() + " " + userDto.getLastName());
        user.setEmail(userDto.getEmail());
        return user;
    }

    @Override
    public User updateUsuario(Long usuarioId, User updatedUsuario) {
        User usuario = userRepository.findById(usuarioId).orElseThrow(
                () -> new ResourceNotFoundException("No hay un ejercicio con el id: " + usuarioId)
        );
        usuario.setName(updatedUsuario.getName());
        usuario.setEmail(updatedUsuario.getEmail());
        usuario.setPassword(passwordEncoder.encode(updatedUsuario.getPassword()));
        User updatedUserObj =  userRepository.save(usuario);

        UserDto usuarioDto = convertEntityToDto(usuario);
        return usuario;
    }

    public boolean validarPassword(String email, String contrasena) {
        // Obtener el usuario desde la base de datos por su email
        User usuario = userRepository.findByEmail(email);

        // Verificar si el usuario existe
        if (usuario == null) {
            return false; // El usuario no existe
        }

        // Comparar la contraseña proporcionada con la almacenada en la base de datos
        return passwordEncoder.matches(contrasena, usuario.getPassword());
    }

    @Override
    public void deleteUser(long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("No hay una tarea con el id: " + userId));


        List<Categoria> categoriasAsociadas = categoriaRepository.findByUserId(userId);

        //Eliminamos las categorias
        List<Tareas> tareasAsociadas = tareasRepository.findByUser(user);

        // Eliminar cada tarea asociada al usuario
        for (Tareas tarea : tareasAsociadas) {
            // Puedes realizar otras acciones relacionadas con la eliminación de tareas si es necesario
            // Por ejemplo, eliminar categorías asociadas a cada tarea
            // ...

            // Eliminar la tarea
            tareasRepository.deleteById(tarea.getId());
        }

        // Eliminar cada categoria asociada al usuario
        for (Categoria categoria : categoriasAsociadas) {
            // Puedes realizar otras acciones relacionadas con la eliminación de tareas si es necesario
            // Por ejemplo, eliminar categorías asociadas a cada tarea
            // ...

            // Eliminar la tarea
            categoriaRepository.deleteById(categoria.getId());
        }

        userRepository.deleteById(user.getId());

    }

}
