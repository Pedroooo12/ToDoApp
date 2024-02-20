package com.example.emsbackend.controller;

import com.example.emsbackend.entity.Categoria;
import com.example.emsbackend.entity.Ejercicios;
import com.example.emsbackend.service.EjerciciosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.List;


@RestController
@RequestMapping("/api/ejercicios")
public class EjercicioController {
    @Autowired
    private EjerciciosService ejercicioService;

    //Para añadir nuevos empleados
    @PostMapping
    public ResponseEntity<Ejercicios> createEjercicio(@RequestBody() Ejercicios ejercicio){
        Ejercicios savedEjercicio = ejercicioService.createEjercicio(ejercicio);
        return new ResponseEntity<>(savedEjercicio, HttpStatus.CREATED);
    }

    //Para leer los datos de un empleado a partir del id
    @GetMapping("{id}")
    public ResponseEntity<Ejercicios> getEjercicioById(@PathVariable("id") Long ejercicioId){
        Ejercicios ejercicio = ejercicioService.getEjercicioById(ejercicioId);
        //return ResponseEntity.ok(ejercicio);

        return ResponseEntity.ok(ejercicio);

    }

    //Leemos la lista de todos los ejercicios
    @GetMapping
    public ResponseEntity<List<Ejercicios>> getAllEjercicios(){
        List<Ejercicios> ejercicios = ejercicioService.getAllEjercicios();
        return ResponseEntity.ok(ejercicios);
    }

    /*@GetMapping("/rutina/{id}")
    public ResponseEntity<List<Ejercicios>> getAllEjerciciosByRutina(Categoria categoria){
        List<Ejercicios> ejercicios = ejercicioService.findEjercicioByRutina(rutina);
        return ResponseEntity.ok(ejercicios);
    }*/

    //Para modificar los datos de un empleado
    @PutMapping("{id}")
    public ResponseEntity<Ejercicios> updateEjercicio(@PathVariable("id") Long ejercicioId, @RequestBody Ejercicios updatedEjercicio){
        //Ejercicios ejercicio = ejercicioService.updateEjercicio(ejercicioId, updatedEjercicio);
        Ejercicios ejercicio = ejercicioService.updateEjercicio(ejercicioId, updatedEjercicio);
        return ResponseEntity.ok(ejercicio);
    }

    //Para eliminar un empleado
    @DeleteMapping("{id}")
    public void  deleteEjercicio(@PathVariable("id") Long ejercicioId){
        ejercicioService.deleteEjercicio(ejercicioId);
    }
}
