package com.example.emsbackend.controller;

import com.example.emsbackend.entity.Categoria;
import com.example.emsbackend.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categoria")
public class CategoriaController {
    @Autowired
    private CategoriaService categoriaService;

    //Para añadir nuevos categorias
    @PostMapping
    public ResponseEntity<Categoria> createCategoria(@RequestBody Categoria categoria){
        Categoria savedCategoria = categoriaService.createCategoria(categoria);
        return new ResponseEntity<>(savedCategoria, HttpStatus.CREATED);
    }

    //Para leer los datos de un empleado a partir del id
    @GetMapping("{id}")
    public ResponseEntity<Categoria> getCategoriaById(@PathVariable("id") Long categoriaId){
        Categoria categoria = categoriaService.getCategoriaById(categoriaId);
        if (categoria != null) {
            return ResponseEntity.ok(categoria);
        } else {
            // Si no se encuentra el empleado, devolver un error 404
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //Leemos la lista de todos los rutinas por id
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Categoria>> getAllCategoriasByUserId(@PathVariable Long userId) {
        List<Categoria> rutinas = categoriaService.getAllCategorias(userId);
        return ResponseEntity.ok(rutinas);
    }

    //Leemos la lista de todos los rutinas por id

    //Para modificar los datos de un empleado
    @PutMapping("{id}")
    public ResponseEntity<Categoria> updateCategoria(@PathVariable("id") Long categoriaId, @RequestBody Categoria updatedCategoria){
        Categoria categoria = categoriaService.updateRutina(categoriaId, updatedCategoria);
        return ResponseEntity.ok(categoria);
    }

    //Para eliminar un empleado
    @DeleteMapping("{id}")
    public void  deleteCategoria(@PathVariable("id") Long categoriaId){
        categoriaService.deleteCategoria(categoriaId);
    }
}
