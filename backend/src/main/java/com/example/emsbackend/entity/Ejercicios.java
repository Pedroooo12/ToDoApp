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
@Table(name="ejercicios")
public class Ejercicios {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="nombre", nullable = false, unique = true)
    private String nombre;
    @Column(name="series", nullable = false)
    private Integer series;
    @Column(name="repeticiones", nullable = false)
    private Integer repeticiones;

    @Lob
    @Column(name = "imagen", nullable = false,columnDefinition = "LONGTEXT")
    //private String imagen;
    private String imagen;

   /* @ManyToOne
    @JoinColumn(name = "rutina_id")
    private Rutina rutina;*/
}
