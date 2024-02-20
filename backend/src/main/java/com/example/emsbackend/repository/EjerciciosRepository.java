package com.example.emsbackend.repository;

import com.example.emsbackend.entity.Ejercicios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EjerciciosRepository extends JpaRepository<Ejercicios, Long>{
    //List<Ejercicios> findByRutina(Rutina rutina);
}
