package com.example.emsbackend.repository;

import com.example.emsbackend.entity.Categoria;
import com.example.emsbackend.entity.Importancia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImportanciaRepository extends JpaRepository<Importancia, Long>{
}
