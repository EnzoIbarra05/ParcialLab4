package org.example.RepositorioJPA;

import org.example.Entidades.CategoriaInstrumento;
import org.example.Entidades.Instrumento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InstrumentoRepositorio extends JpaRepository<Instrumento, Long> {
    List<Instrumento> findByCategoriaAndActivoTrue(CategoriaInstrumento categoria);
    List<Instrumento> findByActivoTrue();
}
