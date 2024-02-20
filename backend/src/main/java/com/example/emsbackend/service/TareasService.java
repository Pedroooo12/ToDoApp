package com.example.emsbackend.service;

import com.example.emsbackend.entity.Categoria;
import com.example.emsbackend.entity.Importancia;
import com.example.emsbackend.entity.Tareas;

import java.util.List;

public interface TareasService {
    Tareas createTarea(Tareas tarea);
    Tareas getTareaById(Long tareaId);
    List<Tareas> getAllTareas();
    Tareas updateTarea(Long tareaId, Tareas updatedTarea);

    void deleteTarea(Long tareaId);

    /*void deleteEjercicioByRutina(Rutina rutina);*/

    List<Tareas> findByImportancia(Importancia importancia);
    List<Tareas> findByCategoria(Categoria categoria);
}
