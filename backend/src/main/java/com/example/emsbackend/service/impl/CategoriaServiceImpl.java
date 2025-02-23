package com.example.emsbackend.service.impl;


import com.example.emsbackend.entity.Categoria;
import com.example.emsbackend.entity.Tareas;
import com.example.emsbackend.exception.ResourceNotFoundException;
import com.example.emsbackend.repository.CategoriaRepository;
import com.example.emsbackend.repository.TareasRepository;
import com.example.emsbackend.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaServiceImpl implements CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private TareasRepository tareasRepository;
    @Override
    public Categoria createCategoria(Categoria categoria) {
        Categoria categoriaSaved = categoriaRepository.save(categoria);
        return categoriaSaved;
    }

    @Override
    public Categoria getCategoriaById(Long categoriaId) {
        Categoria categoria = categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new ResourceNotFoundException("No existe una rutina con el id: " + categoriaId));
        return categoria;
    }

    @Override
    public List<Categoria> getAllCategorias(Long id) {
        List<Categoria> categorias = categoriaRepository.findByUserId(id);
        return categorias;
    }

    @Override
    public Categoria updateCategoria(Long categoriaId, Categoria updatedCategoria) {
        Categoria categoria = categoriaRepository.findById(categoriaId).orElseThrow(
                () -> new ResourceNotFoundException("No hay un empleado con el id: " + categoriaId)
        );
        categoria.setCategoria(updatedCategoria.getCategoria());
        categoria.setColor(updatedCategoria.getColor());
        Categoria updatedCategoriaObj =  categoriaRepository.save(categoria);

        return categoria;
    }

    @Override
    public void deleteCategoria(Long categoriaId) {
        Categoria categoria = categoriaRepository.findById(categoriaId).orElseThrow(
                () -> new ResourceNotFoundException("No existe una rutina con el id: " + categoriaId)
        );

        // Obtener ejercicios asociados a la rutina
        List<Tareas> tareasAsociadas = tareasRepository.findByCategoria(categoria);
            // Eliminar cada ejercicio asociado
        tareasAsociadas.forEach(tarea -> tarea.setCategoria(null));

        // Eliminar la rutina
        categoriaRepository.deleteById(categoriaId);

    }



}
