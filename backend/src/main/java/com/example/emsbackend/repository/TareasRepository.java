package com.example.emsbackend.repository;

import com.example.emsbackend.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TareasRepository extends JpaRepository<Tareas, Long>{

    long countByCategoria(Categoria categoria);
    List<Tareas> findByEstadoAndUser(Estado estado, User user);

    List<Tareas> findByCategoria(Categoria categoria);

    //Métodos para las estadisticas
    long countByUser(User user);
    long countByEstadoAndUser(Estado estado,User user);

    long countByImportancia(Importancia importancia);

    long countByImportanciaAndEstado(Importancia importancia, Estado estado);

    //Filtrado

    List<Tareas> findByUser(User user);

    List<Tareas> findByCategoriaAndUser(Categoria categoria, User user);

    List<Tareas> findByImportanciaAndUser(Importancia importancia, User user);

    List <Tareas> findByImportanciaAndCategoriaAndUser(Importancia importancia, Categoria categoria, User user);
    
}
