package org.example.Service;
import jakarta.transaction.Transactional;
import org.example.Entidades.CategoriaInstrumento;
import org.example.Entidades.Instrumento;
import org.example.Entidades.TipoCategoria;
import org.example.RepositorioJPA.CategoriaRepositorio;
import org.example.RepositorioJPA.InstrumentoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;


@Service
public class InstrumentoService {

    @Autowired
    private final InstrumentoRepositorio repositorio;

    @Autowired
    private CategoriaRepositorio categoriaRepo;

    @PersistenceContext
    private EntityManager entityManager;

    private final Path uploadPath = Paths.get("uploads/img");

    //Crear directorio de carga de imagenes
    public InstrumentoService(InstrumentoRepositorio repositorio) {
        this.repositorio = repositorio;
        try {
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
        } catch (IOException e) {
            System.err.println("Error al crear el directorio de imágenes: " + e.getMessage());
        }
    }

    // Listar todos los instrumentos (solo activos)
    public List<Instrumento> getAllInstrumentos() {
        return repositorio.findByActivoTrue();
    }

    // Buscar instrumento por id (solo activos)
    public Instrumento getInstrumentoById(Long id) {
        return repositorio.findById(id).filter(Instrumento::isActivo).orElse(null);
    }

    // Listar instrumento por Categoria (solo activos)
    public List<Instrumento> getInstrumentosPorCategoria(TipoCategoria tipoCategoria) {
        CategoriaInstrumento categoria = categoriaRepo.findByDenominacion(tipoCategoria);
        if (categoria == null) {
            return List.of();
        }
        return repositorio.findByCategoriaAndActivoTrue(categoria);
    }

    // Alta de instrumento
    @Transactional
    public Instrumento saveInstrumento(Instrumento instrumento, MultipartFile imagenFile) throws IOException{
        if (instrumento.isActivo() == null) {
            instrumento.setActivo(true);
        }

        if (imagenFile != null && !imagenFile.isEmpty()) {
            String nombreArchivo = guardarImagen(imagenFile);
            instrumento.setImagen(nombreArchivo);
        }
        return repositorio.save(instrumento);
    }

    // Baja lógica de instrumento
    @Transactional
    public boolean deleteInstrumento(Long id) {
        Instrumento instrumento = repositorio.findById(id).orElse(null);
        if (instrumento == null) {
            return false;
        }
        instrumento.setActivo(false);
        return true;
    }

    // Modificación de instrumento
    @Transactional
    public Instrumento updateInstrumento(Long id, Instrumento instrumentoActualizado, MultipartFile imagenFile) throws IOException {
        Instrumento instrumentoExistente = repositorio.findById(id).orElse(null);
        if (instrumentoExistente == null) {
            return null;
        }

        // Actualizar solo los campos que han cambiado(con Entity manager)
        if (!instrumentoActualizado.getInstrumento().equals(instrumentoExistente.getInstrumento())) {
            instrumentoExistente.setInstrumento(instrumentoActualizado.getInstrumento());
        }

        if (!instrumentoActualizado.getMarca().equals(instrumentoExistente.getMarca())) {
            instrumentoExistente.setMarca(instrumentoActualizado.getMarca());
        }

        if (!instrumentoActualizado.getModelo().equals(instrumentoExistente.getModelo())) {
            instrumentoExistente.setModelo(instrumentoActualizado.getModelo());
        }

        if (!instrumentoActualizado.getPrecio().equals(instrumentoExistente.getPrecio())) {
            instrumentoExistente.setPrecio(instrumentoActualizado.getPrecio());
        }

        if (!instrumentoActualizado.getCostoEnvio().equals(instrumentoExistente.getCostoEnvio())) {
            instrumentoExistente.setCostoEnvio(instrumentoActualizado.getCostoEnvio());
        }

        if (!instrumentoActualizado.getCantidadVendida().equals(instrumentoExistente.getCantidadVendida())) {
            instrumentoExistente.setCantidadVendida(instrumentoActualizado.getCantidadVendida());
        }

        if (!instrumentoActualizado.getDescripcion().equals(instrumentoExistente.getDescripcion())) {
            instrumentoExistente.setDescripcion(instrumentoActualizado.getDescripcion());
        }

        if (!Objects.equals(instrumentoActualizado.getCategoria(), instrumentoExistente.getCategoria())) {
            instrumentoExistente.setCategoria(instrumentoActualizado.getCategoria());
        }

        if (imagenFile != null && !imagenFile.isEmpty()) {
            eliminarImagenExistente(instrumentoExistente.getImagen());
            String nuevoNombreArchivo = guardarImagen(imagenFile);
            instrumentoExistente.setImagen(nuevoNombreArchivo);
        }

        return instrumentoExistente;
    }


    // Métodos de manejo de imagen
    private String guardarImagen(MultipartFile file) throws IOException {
        String extension = StringUtils.getFilenameExtension(file.getOriginalFilename());
        String fileName = UUID.randomUUID().toString() + "." + extension;
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return fileName;
    }

    private void eliminarImagenExistente(String nombreImagen) throws IOException {
        if (nombreImagen != null && !nombreImagen.isEmpty()) {
            Path oldImagePath = uploadPath.resolve(nombreImagen);
            Files.deleteIfExists(oldImagePath);
        }
    }
}

