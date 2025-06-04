package org.example.Service;

import org.example.Entidades.CategoriaInstrumento;
import org.example.RepositorioJPA.CategoriaRepositorio;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CategoriaService {

    private final CategoriaRepositorio categoriaRepositorio;

    public CategoriaService(CategoriaRepositorio categoriaRepositorio) { this.categoriaRepositorio = categoriaRepositorio;}

    //Listar todas las categorias
    public List<CategoriaInstrumento> getAllCategorias() {
        return categoriaRepositorio.findAll();
    }

}

