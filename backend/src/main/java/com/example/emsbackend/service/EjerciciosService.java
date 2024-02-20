package com.example.emsbackend.service;

import com.example.emsbackend.entity.Ejercicios;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface EjerciciosService {
    Ejercicios createEjercicio(Ejercicios ejercicio);
    Ejercicios getEjercicioById(Long employeeId);
    List<Ejercicios> getAllEjercicios();
    Ejercicios updateEjercicio(Long ejercicioId, Ejercicios updatedEjercicio);

    void deleteEjercicio(Long ejerId);

    /*void deleteEjercicioByRutina(Rutina rutina);

    List<Ejercicios> findEjercicioByRutina(Rutina rutina);*/
}
