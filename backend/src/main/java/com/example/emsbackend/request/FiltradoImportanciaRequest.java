package com.example.emsbackend.request;

import com.example.emsbackend.entity.Estado;
import lombok.Data;

@Data
public class FiltradoImportanciaRequest {
    private Long importanciaId;
    private Estado estado;
}
