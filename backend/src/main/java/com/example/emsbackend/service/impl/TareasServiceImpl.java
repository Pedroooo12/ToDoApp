package com.example.emsbackend.service.impl;


import com.example.emsbackend.entity.Categoria;
import com.example.emsbackend.entity.Importancia;
import com.example.emsbackend.entity.Tareas;
import com.example.emsbackend.entity.User;
import com.example.emsbackend.exception.ResourceNotFoundException;
import com.example.emsbackend.repository.CategoriaRepository;
import com.example.emsbackend.repository.ImportanciaRepository;
import com.example.emsbackend.repository.TareasRepository;
import com.example.emsbackend.service.TareasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TareasServiceImpl implements TareasService {
    @Autowired
    private TareasRepository tareasRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    ImportanciaRepository importanciaRepository;

    @Override
    public Tareas createTarea(Tareas tarea){

        Tareas ejercicioSaved = tareasRepository.save(tarea);
        return ejercicioSaved;
    }

    @Override
    public Tareas getTareaById(Long tareaId) {
        Tareas tarea = tareasRepository.findById(tareaId)
                .orElseThrow(() -> new ResourceNotFoundException("No existe un empleaqdo con el id: " + tareaId));
        return tarea;
    }

    @Override
    public List<Tareas> getAllTareas() {
        List<Tareas> tareas = tareasRepository.findAll();
        return tareas;
    }

    @Override
    public Tareas updateTarea(Long tareaId, Tareas updatedTarea) {
        Tareas tarea = tareasRepository.findById(tareaId).orElseThrow(
                () -> new ResourceNotFoundException("No hay un ejercicio con el id: " + tareaId)
        );
        tarea.setNombre(updatedTarea.getNombre());
        tarea.setDescripcion(updatedTarea.getDescripcion());
        tarea.setTerminada(updatedTarea.getTerminada());
        tarea.setCategoria(updatedTarea.getCategoria());
        tarea.setImportancia(updatedTarea.getImportancia());
        Tareas updatedEjercicioObj =  tareasRepository.save(tarea);

        return tarea;
    }

    @Override
    public void deleteTarea(Long tareaId) {
        Tareas tarea = tareasRepository.findById(tareaId)
                .orElseThrow(() -> new ResourceNotFoundException("No hay una tarea con el id: " + tareaId));

        Categoria categoria = tarea.getCategoria();
        Importancia importancia = tarea.getImportancia();

        // Eliminamos la tarea
        tareasRepository.deleteById(tareaId);

        // Verificamos si hay otras tareas asociadas a la misma categoría
        long tareasConMismaCategoria = tareasRepository.countByCategoria(categoria);
        if (tareasConMismaCategoria == 0) {
            // Si no hay otras tareas asociadas, eliminamos la categoría
            categoriaRepository.deleteById(categoria.getId());
        }

        // Verificamos si hay otras tareas asociadas a la misma importancia
        long tareasConMismaImportancia = tareasRepository.countByImportancia(importancia);
        if (tareasConMismaImportancia == 0) {
            // Si no hay otras tareas asociadas, eliminamos la importancia
            importanciaRepository.deleteById(importancia.getId());
        }
    }

    @Override
    public List<Tareas> findByCategoria(Categoria categoria){
        return tareasRepository.findByCategoria(categoria);
    }

    @Override
    public List<Tareas> findByImportancia(Importancia importancia){
        return tareasRepository.findByImportancia(importancia);
    }

    @Override
    public List<Tareas> findByUser(User user){
        return tareasRepository.findByUser(user);
    }


}
