package com.example.emsbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="tareas")
public class Tareas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="nombre", nullable = false, unique = true)
    private String nombre;
    @Column(name="descripcion", nullable = false)
    private String descripcion;

    @Column(name="terminada", nullable = false)
    private Boolean terminada;

    @OneToOne
    @JoinColumn(name="importancia_id")
    private Importancia importancia;

    @OneToOne
    @JoinColumn(name="categoria_id")
    private Categoria categoria;

}
