package com.example.emsbackend.repository;

import com.example.emsbackend.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TareasRepository extends JpaRepository<Tareas, Long>{
    List<Tareas> findByCategoria(Categoria categoria);
    List<Tareas> findByImportancia(Importancia importancia);

    List<Tareas> findByUser(User user);

    long countByCategoria(Categoria categoria);

    long countByImportancia(Importancia importancia);


    List<Tareas> findByEstado(Estado estado);
}
