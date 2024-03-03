package com.example.emsbackend.controller;

import com.example.emsbackend.entity.Categoria;
import com.example.emsbackend.entity.Estado;
import com.example.emsbackend.entity.Importancia;
import com.example.emsbackend.entity.Tareas;
import com.example.emsbackend.request.FiltradoRequest;
import com.example.emsbackend.service.CategoriaService;
import com.example.emsbackend.service.ImportanciaService;
import com.example.emsbackend.service.TareasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/tareas")
public class TareaController {
    @Autowired
    private TareasService tareasService;

    @Autowired
    private CategoriaService categoriaService;

    @Autowired
    private ImportanciaService importanciaService;

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

    /*@PostMapping("/categoria/filtrado")
    public ResponseEntity<List<Tareas>> getTareaByCategoria(@RequestParam()  Long categoriaId,@RequestParam() Estado estado){
        Categoria categoria = categoriaService.getCategoriaById(categoriaId);
        List<Tareas> tareas = tareasService.findByCategoria(categoria, estado);

        return ResponseEntity.ok(tareas);

    }*/
    @PostMapping("/categoria/filtrado")
    public ResponseEntity<List<Tareas>> getTareaByCategoria(@RequestBody FiltradoRequest filtroTareasRequest) {
        Categoria categoria = categoriaService.getCategoriaById(filtroTareasRequest.getCategoriaId());
        List<Tareas> tareas = tareasService.findByCategoria(categoria, filtroTareasRequest.getEstado());

        return ResponseEntity.ok(tareas);
    }


    @PostMapping("/importancia/filtrado")
    public ResponseEntity<List<Tareas>> getTareaByImportancia(@RequestBody() Long importanciaId,@RequestBody()  Estado estado){
        Importancia importancia = importanciaService.getImportanciaById(importanciaId);
        List<Tareas> tareas = tareasService.findByImportancia(importancia, estado);
        return ResponseEntity.ok(tareas);

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
