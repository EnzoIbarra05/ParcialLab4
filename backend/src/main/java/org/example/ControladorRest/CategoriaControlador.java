package org.example.ControladorRest;

import org.example.Entidades.CategoriaInstrumento;
import org.example.RepositorioJPA.CategoriaRepositorio;
import org.example.Service.CategoriaService;
import org.example.Service.InstrumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/categorias")
public class CategoriaControlador {

    @Autowired
    private CategoriaRepositorio categoriaRepositorio;

    @Autowired
    private CategoriaService categoriaService;

    @Autowired
    private InstrumentoService instrumentoService;

    //Listar Categorias
    @GetMapping
    public ResponseEntity<List<CategoriaInstrumento>> obtenerCategorias() {
        try {
            List<CategoriaInstrumento> categorias = categoriaService.getAllCategorias();
            return ResponseEntity.ok(categorias);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}

