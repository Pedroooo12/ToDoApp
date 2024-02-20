package com.example.emsbackend.service.impl;


import com.example.emsbackend.entity.Ejercicios;
import com.example.emsbackend.exception.ResourceNotFoundException;
import com.example.emsbackend.service.EjerciciosService;
import com.example.emsbackend.repository.EjerciciosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class EjercicioServiceImpl implements EjerciciosService {
    @Autowired
    private EjerciciosRepository ejercicioRepository;
    @Override
    public Ejercicios createEjercicio(Ejercicios ejercicio){

        Ejercicios ejercicioSaved = ejercicioRepository.save(ejercicio);
        return ejercicioSaved;
    }

    @Override
    public Ejercicios getEjercicioById(Long ejercicioId) {
        Ejercicios ejercicio = ejercicioRepository.findById(ejercicioId)
                .orElseThrow(() -> new ResourceNotFoundException("No existe un empleaqdo con el id: " + ejercicioId));
        return ejercicio;
    }

    @Override
    public List<Ejercicios> getAllEjercicios() {
        List<Ejercicios> ejercicios = ejercicioRepository.findAll();
        return ejercicios;
    }

    @Override
    public Ejercicios updateEjercicio(Long ejercicioId, Ejercicios updatedEjercicio) {
        Ejercicios ejercicio = ejercicioRepository.findById(ejercicioId).orElseThrow(
                () -> new ResourceNotFoundException("No hay un ejercicio con el id: " + ejercicioId)
        );
        ejercicio.setNombre(updatedEjercicio.getNombre());
        ejercicio.setImagen(updatedEjercicio.getImagen());
        ejercicio.setSeries(updatedEjercicio.getSeries());
        ejercicio.setRepeticiones(updatedEjercicio.getRepeticiones());
        Ejercicios updatedEjercicioObj =  ejercicioRepository.save(ejercicio);

        return ejercicio;
    }

    @Override
    public void deleteEjercicio(Long ejercicioId) {
        Ejercicios ejercicio = ejercicioRepository.findById(ejercicioId).orElseThrow(
                () -> new ResourceNotFoundException("No hay un ejercicio con el id: " + ejercicioId)
        );
        ejercicioRepository.deleteById(ejercicioId);

    }

    /*@Override
    public List<Ejercicios> findEjercicioByRutina(Rutina rutina){
        return ejercicioRepository.findByRutina(rutina);
    }

    @Override
    public void deleteEjercicioByRutina(Rutina rutina){
        // Obtener la lista de ejercicios asociados a la rutina
        List<Ejercicios> ejercicios = ejercicioRepository.findByRutina(rutina);

        // Eliminar cada ejercicio asociado
        for (Ejercicios ejercicio : ejercicios) {
            ejercicioRepository.delete(ejercicio);
        }
    }*/


}
