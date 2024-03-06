package com.example.emsbackend.controller;

import com.example.emsbackend.entity.*;
import com.example.emsbackend.repository.EstadoRepository;

import com.example.emsbackend.service.CategoriaService;
import com.example.emsbackend.service.ImportanciaService;
import com.example.emsbackend.service.TareasService;
import com.example.emsbackend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/tareas")
public class TareaController {
    @Autowired
    private TareasService tareasService;

    @Autowired
    private CategoriaService categoriaService;

    @Autowired
    private ImportanciaService importanciaService;

    @Autowired
    private EstadoRepository estadoRepository;

    @Autowired
    private UserService userService;

    //Para añadir nuevos empleados
    @PostMapping
    public ResponseEntity<Tareas> createTarea(@RequestBody() Tareas tarea){
        Tareas savedEjercicio = tareasService.createTarea(tarea);
        return new ResponseEntity<>(savedEjercicio, HttpStatus.CREATED);
    }

    //Para leer los datos de un empleado a partir del id
    @GetMapping("{id}")
    public ResponseEntity<Tareas> getTareaById(@PathVariable("id") Long tareaId){
        Tareas ejercicio = tareasService.getTareaById(tareaId);

        return ResponseEntity.ok(ejercicio);

    }

    @GetMapping("/all")
    public ResponseEntity<List<Tareas>> getTareas(){
        List<Tareas> tareas = tareasService.getAllTareas();

        return ResponseEntity.ok(tareas);

    }



    @GetMapping("/filtroTotal")
    public ResponseEntity<List<Tareas>> getTareaByAllFiltros(
            @RequestParam Long categoria,
            @RequestParam  Long importancia,
            @RequestParam  Long id_user) {
        User user = userService.findById(id_user);
        List<Tareas> tareas;
        if(categoria == 0 && importancia == 0){
            //normal
            tareas = tareasService.findByUser(user);
        }else if(categoria != 0 && importancia == 0){
            Categoria categoriaObj = categoriaService.getCategoriaById(categoria);
            tareas = tareasService.buscarTareasPorUsuarioYCategoria(categoriaObj,user);
        }else if(categoria == 0 && importancia != 0){
            Importancia importanciaObj = importanciaService.getImportanciaById(importancia);
            tareas = tareasService.buscarTareasPorUsuarioYImportancia(importanciaObj, user);

        }else{
            Categoria categoriaObj = categoriaService.getCategoriaById(categoria);
            Importancia importanciaObj = importanciaService.getImportanciaById(importancia);
            //buscar por tareas y importancia
            tareas = tareasService.buscarTareasPorUsuarioImportanciaYCategoria(importanciaObj,categoriaObj,user);
        }

        return ResponseEntity.ok(tareas);
    }

    @GetMapping("/buscador")
    public ResponseEntity<List<Tareas>> getTareaByBuscador(
            @RequestParam(required = false) String terminoBusqueda, @RequestParam  Long id_user) {
        User user = userService.findById(id_user);
        List<Tareas> todasTareas = tareasService.buscarTareasPorUsuario(user);

        if (terminoBusqueda != null && !terminoBusqueda.isEmpty()) {
            // Aplicar la lógica de búsqueda aquí, por ejemplo:
            List<Tareas> tareasSeleccionadas = todasTareas.stream()
                    .filter(t -> t.getNombre().contains(terminoBusqueda))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(tareasSeleccionadas);
        }
        return ResponseEntity.ok(Collections.emptyList());
    }


    //Leemos la lista de todos los ejercicios
    @GetMapping
    public ResponseEntity<List<Tareas>> getAllTareas(){
        List<Tareas> tareas = tareasService.getAllTareas();
        return ResponseEntity.ok(tareas);
    }


    //Para modificar los datos de un empleado
    @PutMapping("{id}")
    public ResponseEntity<Tareas> updateTarea(@PathVariable("id") Long tareaId, @RequestBody Tareas updatedTarea){
        Tareas tarea = tareasService.updateTarea(tareaId, updatedTarea);
        return ResponseEntity.ok(tarea);
    }

    @PutMapping("/cambiarEstado/{id}")
    public ResponseEntity<Tareas> updateTarea(@PathVariable("id") Long tareaId, @RequestBody Long estadoId){
        Tareas tarea = tareasService.updateTareaEstado(tareaId, estadoId);
        return ResponseEntity.ok(tarea);
    }

    @PutMapping("/terminarTarea/")
    public ResponseEntity<Tareas> updateTarea( @RequestBody Tareas tareaRecibida){
        Tareas tarea = tareasService.terminarTarea(tareaRecibida);
        return ResponseEntity.ok(tarea);
    }

    @PutMapping("/terminarTareas/")
    public ResponseEntity<List<Tareas>> updateTarea( @RequestBody List<Tareas> tareasRecibida){
        List<Tareas> tareas = tareasService.terminarTareas(tareasRecibida);
        return ResponseEntity.ok(tareas);
    }

    @PostMapping("/estado/")
    public ResponseEntity<List<Tareas>> getAllCategoriesByEstado(@RequestBody() Estado estado) {
        List<Tareas> tareas = tareasService.findByEstado(estado);
        return ResponseEntity.ok(tareas);
    }

    //Para eliminar un empleado
    @DeleteMapping("{id}")
    public void  deleteEjercicio(@PathVariable("id") Long tareaId){
        tareasService.deleteTarea(tareaId);
    }
}
