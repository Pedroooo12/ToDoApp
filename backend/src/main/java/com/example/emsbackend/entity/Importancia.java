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
@Table(name="importancia")
public class Importancia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="importancia", nullable = false, unique = true)
    private String importancia;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
}
