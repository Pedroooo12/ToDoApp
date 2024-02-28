package com.example.emsbackend.service;



import com.example.emsbackend.entity.Categoria;

import java.util.List;

public interface CategoriaService {
    Categoria createCategoria(Categoria categoria);
    Categoria getCategoriaById(Long categoriaId);
    List<Categoria> getAllCategorias(Long user_id);
    Categoria updateRutina(Long categoriaId, Categoria updatedCategoria);

    void deleteCategoria(Long categoriaId);

}
