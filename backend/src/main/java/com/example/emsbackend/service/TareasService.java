package com.example.emsbackend.service;

import com.example.emsbackend.entity.*;

import java.util.List;

public interface TareasService {
    Tareas createTarea(Tareas tarea);
    Tareas getTareaById(Long tareaId);
    List<Tareas> getAllTareas();
    Tareas updateTarea(Long tareaId, Tareas updatedTarea);

    Tareas updateTareaEstado(Long tareaId, Long estadoId);

    void deleteTarea(Long tareaId);

    /*void deleteEjercicioByRutina(Rutina rutina);*/

    List<Tareas> findByImportancia(Importancia importancia, Estado estado);
    List<Tareas> findByCategoria(Categoria categoria, Estado estado);

    List<Tareas> findByEstado(Estado estado);

    List<Tareas> findByUser(User user);

    Tareas terminarTarea(Tareas tarea);

    List<Tareas> terminarTareas(List<Tareas> tareas);

}
