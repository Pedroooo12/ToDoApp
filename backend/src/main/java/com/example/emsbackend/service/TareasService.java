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




    List<Tareas> findByEstado(Estado estado);

    List<Tareas> findByUser(User user);

    Tareas terminarTarea(Tareas tarea);

    List<Tareas> terminarTareas(List<Tareas> tareas);

    //Metodos estadisticas

    long contarTareasPorUsuario(User user);

    long contarTareasPorEstadoYUsuario(Estado estado, User user);

    //filtrado

    List<Tareas> buscarTareasPorUsuario(User user);

    List<Tareas> buscarTareasPorUsuarioYCategoria(Categoria categoria,User user);

    List<Tareas> buscarTareasPorUsuarioYImportancia(Importancia importancia,User user);

    List<Tareas> buscarTareasPorUsuarioImportanciaYCategoria(Importancia importancia, Categoria categoria, User user);
}
