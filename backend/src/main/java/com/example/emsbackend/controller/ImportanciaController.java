package com.example.emsbackend.controller;

import com.example.emsbackend.entity.Categoria;
import com.example.emsbackend.entity.Importancia;
import com.example.emsbackend.service.CategoriaService;
import com.example.emsbackend.service.ImportanciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/importancia")
public class ImportanciaController {
    @Autowired
    private ImportanciaService importanciaService;

    //Para añadir nuevos categorias
    @PostMapping
    public ResponseEntity<Importancia> createImportancia(@RequestBody Importancia importancia){
        Importancia savedImportancia = importanciaService.createImportancia(importancia);
        return new ResponseEntity<>(savedImportancia, HttpStatus.CREATED);
    }

    //Para leer los datos de un empleado a partir del id
    @GetMapping("{id}")
    public ResponseEntity<Importancia> getImportanciaById(@PathVariable("id") Long importanciaId){
        Importancia importancia = importanciaService.getImportanciaById(importanciaId);
        if (importancia != null) {
            return ResponseEntity.ok(importancia);
        } else {
            // Si no se encuentra el empleado, devolver un error 404
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //para leer todas las importancias


    //Leemos la lista de todos los rutinas por id
    @GetMapping("")
    public ResponseEntity<List<Importancia>> getAllCategoriasByUserId() {
        List<Importancia> importancias = importanciaService.getAllImportancias();
        return ResponseEntity.ok(importancias);
    }

    //Para modificar los datos de un empleado
    @PutMapping("{id}")
    public ResponseEntity<Importancia> updateImportancia(@PathVariable("id") Long importanciaId, @RequestBody Importancia updatedImportancia){
        Importancia importancia = importanciaService.updateImportancia(importanciaId, updatedImportancia);
        return ResponseEntity.ok(importancia);
    }

    //Para eliminar un empleado
    @DeleteMapping("{id}")
    public void  deleteImportancia(@PathVariable("id") Long importanciaId){
        importanciaService.deleteImportancia(importanciaId);
    }
}
