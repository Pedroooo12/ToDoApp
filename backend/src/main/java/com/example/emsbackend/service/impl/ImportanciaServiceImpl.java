package com.example.emsbackend.service.impl;


import com.example.emsbackend.entity.Importancia;
import com.example.emsbackend.exception.ResourceNotFoundException;
import com.example.emsbackend.repository.ImportanciaRepository;
import com.example.emsbackend.service.ImportanciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImportanciaServiceImpl implements ImportanciaService {
    @Autowired
    private ImportanciaRepository importanciaRepository;

    @Override
    public Importancia createImportancia(Importancia importancia) {
        Importancia importanciaSaved = importanciaRepository.save(importancia);
        return importanciaSaved;
    }

    @Override
    public List<Importancia> getAllImportancias(Long userId){
        List<Importancia> lista = importanciaRepository.findByUserId(userId);
        return lista;
    }

    @Override
    public Importancia getImportanciaById(Long importanciaId) {
        Importancia importancia = importanciaRepository.findById(importanciaId)
                .orElseThrow(() -> new ResourceNotFoundException("No existe una rutina con el id: " + importanciaId));
        return importancia;
    }

    @Override
    public Importancia updateImportancia(Long importanciaId, Importancia updatedImportancia) {
        Importancia importancia = importanciaRepository.findById(importanciaId).orElseThrow(
                () -> new ResourceNotFoundException("No hay un empleado con el id: " + importanciaId)
        );
        importancia.setImportancia(updatedImportancia.getImportancia());
        Importancia updatedImportanciaObj =  importanciaRepository.save(importancia);

        return importancia;
    }

    @Override
    public void deleteImportancia(Long importanciaId) {
        Importancia importancia = importanciaRepository.findById(importanciaId).orElseThrow(
                () -> new ResourceNotFoundException("No existe una rutina con el id: " + importanciaId)
        );

        /*// Obtener ejercicios asociados a la rutina
        List<Ejercicios> ejerciciosAsociados = ejerciciosRepository.findByRutina(rutina);
            // Eliminar cada ejercicio asociado
        ejerciciosAsociados.forEach(ejercicio -> ejerciciosRepository.delete(ejercicio));*/

        // Eliminar la rutina
        importanciaRepository.deleteById(importanciaId);

    }


}
