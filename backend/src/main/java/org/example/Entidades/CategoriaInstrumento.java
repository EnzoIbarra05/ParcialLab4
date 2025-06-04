package org.example.Entidades;


import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "categoria")
public class CategoriaInstrumento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Enumerated(EnumType.STRING)
    private TipoCategoria denominacion;

    @OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Instrumento> instrumentos;

    public CategoriaInstrumento() {
    }

    public CategoriaInstrumento(TipoCategoria denominacion, List<Instrumento> instrumentos) {
        this.denominacion = denominacion;
        this.instrumentos = instrumentos;
    }

    public long getId() {
        return id;
    }

    public TipoCategoria getDenominacion() {
        return denominacion;
    }

    public void setDenominacion(TipoCategoria denominacion) {
        this.denominacion = denominacion;
    }

    public List<Instrumento> getInstrumentos() {
        return instrumentos;
    }

    public void setInstrumentos(List<Instrumento> instrumentos) {
        this.instrumentos = instrumentos;
    }
}