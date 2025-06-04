package org.example.ControladorRest;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.Entidades.Instrumento;
import org.example.Entidades.TipoCategoria;
import org.example.Service.InstrumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/instrumentos")
public class InstrumentoControlador {

    @Autowired
    private InstrumentoService instrumentoService;
    private final Path uploadPath = Paths.get("uploads/img");

    //Listar Instrumentos
    @GetMapping
    public List<Instrumento> obtenerInstrumentos() {
        return instrumentoService.getAllInstrumentos();
    }

    //Obtener instrumento por ID
    @GetMapping("/{id}")
    public ResponseEntity<Instrumento> obtenerInstrumentoPorId(@PathVariable Long id) {
        try {
            Instrumento instrumento = instrumentoService.getInstrumentoById(id);
            if (instrumento != null) {
                return ResponseEntity.ok(instrumento);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.err.println("Error al obtener el instrumento: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    //Obtener Instrumentos por Categoria
    @GetMapping("/categoria/{denominacion}")
    public ResponseEntity<List<Instrumento>> obtenerInstrumentosPorCategoria(@PathVariable String denominacion) {
        try {
            System.out.println("Recibido: " + denominacion);
            TipoCategoria categoria = TipoCategoria.valueOf(denominacion.toUpperCase());
            List<Instrumento> instrumentos = instrumentoService.getInstrumentosPorCategoria(categoria);
            if (instrumentos.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(instrumentos);
        } catch (IllegalArgumentException e) {
            System.err.println("Categoría inválida: " + denominacion);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Crear un nuevo instrumento
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Instrumento> crearInstrumento(
            @RequestPart(value = "instrumento", required = false) String instrumentoJson,
            @RequestPart(value = "imagenFile", required = true) MultipartFile imagenFile) {
        try {
            if (instrumentoJson == null || instrumentoJson.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(null);
            }

            // Convertir el JSON del instrumento a objeto Instrumento
            ObjectMapper objectMapper = new ObjectMapper();
            Instrumento instrumento = objectMapper.readValue(instrumentoJson, Instrumento.class);

            // Guardar el nuevo instrumento
            Instrumento nuevo = instrumentoService.saveInstrumento(instrumento, imagenFile);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Actualizar instrumento con imagen
    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<Instrumento> actualizarInstrumento(
            @PathVariable Long id,
            @RequestPart("instrumento") String instrumentoJson,
            @RequestPart(value = "imagenFile", required = false) MultipartFile imagenFile) {
        try {
            // Convertir JSON a objeto Instrumento
            ObjectMapper objectMapper = new ObjectMapper();
            Instrumento instrumentoActualizado = objectMapper.readValue(instrumentoJson, Instrumento.class);

            // Actualizar instrumento
            Instrumento actualizado = instrumentoService.updateInstrumento(id, instrumentoActualizado, imagenFile);
            return (actualizado != null)
                    ? ResponseEntity.ok(actualizado)
                    : ResponseEntity.notFound().build();
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Eliminar un instrumento
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarInstrumento(@PathVariable Long id) {
        boolean eliminado = instrumentoService.deleteInstrumento(id);
        if (eliminado) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
