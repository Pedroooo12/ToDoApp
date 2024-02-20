package com.example.emsbackend.service;



import com.example.emsbackend.entity.Importancia;

import java.util.List;

public interface ImportanciaService {
    Importancia createImportancia(Importancia importancia);
    Importancia getImportanciaById(Long importanciaId);

    List<Importancia> getAllImportancias();
    Importancia updateImportancia(Long importanciaId, Importancia updatedImportancia);

    void deleteImportancia(Long importanciaId);
}
