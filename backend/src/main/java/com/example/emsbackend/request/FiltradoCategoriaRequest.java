package com.example.emsbackend.request;

import com.example.emsbackend.entity.Estado;
import lombok.Data;

@Data
public class FiltradoCategoriaRequest {
    private Long categoriaId;
    private Estado estado;
}
