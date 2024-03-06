package com.example.emsbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

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


    @ManyToOne
    @JoinColumn(name="importancia_id")
    private Importancia importancia;

    @ManyToOne
    @JoinColumn(name="categoria_id")
    private Categoria categoria;

    @Column(name = "created")
    @Temporal(TemporalType.TIMESTAMP)
    private Date created;

    @Column(name = "updated")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updated;

    @ManyToOne
    @JoinColumn(name="estado_id")
    private Estado estado;

    @ManyToOne
    @JoinColumn(name="user_id", unique = false)
    private User user;


}
