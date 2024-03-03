package com.example.emsbackend.entity;

import com.example.emsbackend.dto.UserDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="categoria")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="categoria", nullable = false)
    private String categoria;

    @Column(name = "color", nullable = false)
    private String color;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
}
