package com.example.emsbackend.service.impl;


import com.example.emsbackend.entity.*;
import com.example.emsbackend.exception.ResourceNotFoundException;
import com.example.emsbackend.repository.*;
import com.example.emsbackend.service.TareasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TareasServiceImpl implements TareasService {
    @Autowired
    private TareasRepository tareasRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private EstadoRepository estadoRepository;

    @Autowired
    ImportanciaRepository importanciaRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public Tareas createTarea(Tareas tarea){
        if (tarea.getCreated() == null) {
            tarea.setCreated(new Date());
        }
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
        tarea.setCategoria(updatedTarea.getCategoria());
        tarea.setImportancia(updatedTarea.getImportancia());
        tarea.setCreated(updatedTarea.getCreated());
        tarea.setUpdated(new Date());
        tarea.setUser(updatedTarea.getUser());

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
    }


    @Override
    public List<Tareas> findByUser(User user){
        return tareasRepository.findByUser(user);
    }

    @Override
    public List<Tareas> findByEstadoAndUser(Estado estado, User user) {
        List<Tareas> tareas = tareasRepository.findByEstadoAndUser(estado, user);
        return tareas;
    }

    @Override
    public Tareas updateTareaEstado(Long tareaId, Long estadoId){
        Tareas tarea = tareasRepository.findById(tareaId).orElseThrow(
                () -> new ResourceNotFoundException("No hay una tarea con el id: " + tareaId)
        );

        Estado estado = estadoRepository.findById(estadoId).orElseThrow(
                () -> new ResourceNotFoundException("No hay un estado con el id: " + estadoId)
        );

        tarea.setEstado(estado);
        Tareas updatedEjercicioObj =  tareasRepository.save(tarea);

        return tarea;
    }

    @Override
    public Tareas terminarTarea(Tareas tareas){
        Tareas tarea = tareasRepository.findById(tareas.getId()).orElseThrow(
                () -> new ResourceNotFoundException("No hay una tarea con el id: " + tareas.getId())
        );

        long id_estado = 4;
        Estado estado = estadoRepository.findById(id_estado).orElseThrow(
                () -> new ResourceNotFoundException("No hay un estado con el id: " + id_estado)
        );
        //cambiamos el estado a finalizado
        tarea.setEstado(estado);

        //actualizamos
        Tareas updatedEjercicioObj =  tareasRepository.save(tarea);
        return tarea;
    }

    @Override
    public List<Tareas> terminarTareas(Long userId,List<Tareas> tareas){

        User user = userRepository.findById(userId).orElseThrow();
        long id_estado = 4;
        Estado estado = estadoRepository.findById(id_estado).orElseThrow(
                () -> new ResourceNotFoundException("No hay un estado con el id: " + id_estado)
        );

        //List<Tareas> tareasTerminadas = new ArrayList<>();
        List<Tareas> tareasTerminadas = tareasRepository.findByUser(user);

        for (Tareas tarea : tareas) {
            Tareas tareaExistente = tareasRepository.findById(tarea.getId()).orElseThrow(
                    () -> new ResourceNotFoundException("No hay una tarea con el id: " + tarea.getId())
            );

            // Cambiamos el estado a finalizado
            tareaExistente.setEstado(estado);

            // Actualizamos y agregamos a la lista de tareas terminadas
            Tareas updatedTarea = tareasRepository.save(tareaExistente);
            tareasTerminadas.add(updatedTarea);
        }


        return tareasTerminadas;
    }

    //METODOS ESTADISTICAS
    @Override
    public long contarTareasPorUsuario(User user){

        return this.tareasRepository.countByUser(user);
    }

    @Override
    public long contarTareasPorEstadoYUsuario(Estado estado,User user){
        return this.tareasRepository.countByEstadoAndUser(estado, user);
    }


    // METODOS FILTRADO
    @Override
    public List<Tareas> buscarTareasPorUsuario(User user){
        return this.tareasRepository.findByUser(user);
    }
    @Override
    public List<Tareas> buscarTareasPorUsuarioYCategoria(Categoria categoria,User user){
        return this.tareasRepository.findByCategoriaAndUser(categoria,user);
    }

    @Override
    public List<Tareas> buscarTareasPorUsuarioYImportancia(Importancia importancia,User user){
        return this.tareasRepository.findByImportanciaAndUser(importancia,user);
    }



    @Override
    public List<Tareas> buscarTareasPorUsuarioImportanciaYCategoria(Importancia importancia, Categoria categoria, User user){
        return this.tareasRepository.findByImportanciaAndCategoriaAndUser(importancia,categoria,user);
    }

}
