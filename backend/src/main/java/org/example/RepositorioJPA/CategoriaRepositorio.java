package org.example.RepositorioJPA;

import org.example.Entidades.CategoriaInstrumento;
import org.example.Entidades.TipoCategoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CategoriaRepositorio extends JpaRepository<CategoriaInstrumento, Long> {
    CategoriaInstrumento findByDenominacion(TipoCategoria denominacion);
}


