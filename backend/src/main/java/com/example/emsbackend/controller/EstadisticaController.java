package com.example.emsbackend.controller;

import com.example.emsbackend.entity.Categoria;
import com.example.emsbackend.entity.Estado;
import com.example.emsbackend.repository.EstadoRepository;
import com.example.emsbackend.service.CategoriaService;
import com.example.emsbackend.service.TareasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estadisticas")
public class EstadisticaController {
    @Autowired
    private TareasService tareasService;

    @Autowired
    private EstadoRepository estadoRepository;

    @GetMapping("/tareasTotales")
    public ResponseEntity<Long> getTareasTotales() {
        long tareasTotales = tareasService.contarTareas();
        return ResponseEntity.ok(tareasTotales);
    }

    @GetMapping("/tareasToDo")
    public ResponseEntity<Long> getTareasParaHacer() {
        Long id = 1L;
        Estado estado = estadoRepository.findById(id).orElseThrow(null);

        long tareasToDo = tareasService.contarTareasPorEstado(estado);

        return ResponseEntity.ok(tareasToDo);
    }

    @GetMapping("/tareasDoing")
    public ResponseEntity<Long> getTareasHaciendo() {
        Long id = 2L;
        Estado estado = estadoRepository.findById(id).orElseThrow(null);

        long tareasDoing = tareasService.contarTareasPorEstado(estado);

        return ResponseEntity.ok(tareasDoing);
    }

    @GetMapping("/tareasDone")
    public ResponseEntity<Long> getTareasHechas() {
        Long id = 3L;
        Estado estado = estadoRepository.findById(id).orElseThrow(null);

        long tareasDone = tareasService.contarTareasPorEstado(estado);

        return ResponseEntity.ok(tareasDone);
    }

    @GetMapping("/tareasFinalizadas")
    public ResponseEntity<Long> getTareasFinalizadas() {
        Long id = 4L;
        Estado estado = estadoRepository.findById(id).orElseThrow(null);

        long tareasFinalizadas = tareasService.contarTareasPorEstado(estado);

        return ResponseEntity.ok(tareasFinalizadas);
    }




}
