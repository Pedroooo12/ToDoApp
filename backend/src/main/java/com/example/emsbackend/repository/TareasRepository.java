package com.example.emsbackend.repository;

import com.example.emsbackend.entity.Categoria;
import com.example.emsbackend.entity.Importancia;
import com.example.emsbackend.entity.Tareas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TareasRepository extends JpaRepository<Tareas, Long>{
    List<Tareas> findByCategoria(Categoria categoria);
    List<Tareas> findByImportancia(Importancia importancia);
}
