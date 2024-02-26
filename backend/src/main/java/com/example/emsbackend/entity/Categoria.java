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
    @Column(name="categoria", nullable = false, unique = true)
    private String categoria;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
}
