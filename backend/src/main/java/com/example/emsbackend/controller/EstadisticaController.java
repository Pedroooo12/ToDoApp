package com.example.emsbackend.controller;

import com.example.emsbackend.entity.Categoria;
import com.example.emsbackend.entity.Estado;
import com.example.emsbackend.entity.Tareas;
import com.example.emsbackend.entity.User;
import com.example.emsbackend.repository.EstadoRepository;
import com.example.emsbackend.service.CategoriaService;
import com.example.emsbackend.service.TareasService;
import com.example.emsbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/estadisticas")
public class EstadisticaController {
    @Autowired
    private TareasService tareasService;

    @Autowired
    private UserService userService;

    @Autowired
    private EstadoRepository estadoRepository;

    @GetMapping("/tareasTotales/{id}")
    public ResponseEntity<Long> getTareasTotales(@PathVariable Long id) {
        User user = userService.findById(id);
        long tareasTotales = tareasService.contarTareasPorUsuario(user);
        return ResponseEntity.ok(tareasTotales);
    }

    @GetMapping("/tareasToDo/{id}")
    public ResponseEntity<Long> getTareasParaHacer(@PathVariable Long id) {
        User user = userService.findById(id);
        Long id_estado = 1L;
        Estado estado = estadoRepository.findById(id_estado).orElseThrow(null);

        long tareasToDo = tareasService.contarTareasPorEstadoYUsuario(estado,user);

        return ResponseEntity.ok(tareasToDo);
    }

    @GetMapping("/tareasDoing/{id}")
    public ResponseEntity<Long> getTareasHaciendo(@PathVariable Long id) {
        User user = userService.findById(id);
        Long id_estado = 2L;
        Estado estado = estadoRepository.findById(id_estado).orElseThrow(null);

        long tareasDoing = tareasService.contarTareasPorEstadoYUsuario(estado,user);

        return ResponseEntity.ok(tareasDoing);
    }

    @GetMapping("/tareasDone/{id}")
    public ResponseEntity<Long> getTareasHechas(@PathVariable Long id) {
        User user = userService.findById(id);
        Long id_estado = 3L;
        Estado estado = estadoRepository.findById(id_estado).orElseThrow(null);

        long tareasDone = tareasService.contarTareasPorEstadoYUsuario(estado,user);

        return ResponseEntity.ok(tareasDone);
    }

    @GetMapping("/tareasFinalizadas/{id}")
    public ResponseEntity<Long> getTareasFinalizadas(@PathVariable Long id) {
        User user = userService.findById(id);
        Long id_estado = 4L;
        Estado estado = estadoRepository.findById(id_estado).orElseThrow(null);

        long tareasFinalizadas = tareasService.contarTareasPorEstadoYUsuario(estado,user);

        return ResponseEntity.ok(tareasFinalizadas);
    }

}
