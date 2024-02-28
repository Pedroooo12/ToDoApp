package com.example.emsbackend.repository;

import com.example.emsbackend.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long>{
    @Query("SELECT r FROM Categoria r WHERE r.user.id = :userId")
    List<Categoria> findByUserId(@Param("userId") Long userId);


}
