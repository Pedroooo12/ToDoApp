package com.example.emsbackend.repository;

import com.example.emsbackend.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TareasRepository extends JpaRepository<Tareas, Long>{
    List<Tareas> findByCategoriaAndTerminadaAndEstado(Categoria categoria, boolean terminada, Estado estado);
    List<Tareas> findByImportanciaAndTerminadaAndEstado(Importancia importancia, boolean terminada, Estado estado);

    List<Tareas> findByCategoriaAndImportanciaAndTerminadaAndEstado(Categoria categoria,Importancia importancia, boolean terminada, Estado estado);

    List<Tareas> findByUser(User user);

    long countByCategoria(Categoria categoria);

    long countByImportancia(Importancia importancia);

    List<Tareas> findByEstado(Estado estado);
}
