package org.example.Entidades;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "instrumento")
public class Instrumento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String instrumento;
    private String marca;
    private String modelo;
    private String imagen;
    private Double precio;
    private String costoEnvio;
    private Integer cantidadVendida;
    private Boolean activo;

    @Column(columnDefinition = "TEXT")
    private String descripcion;


    @ManyToOne
    @JoinColumn(name="categoria_id")
    @JsonIgnoreProperties("instrumentos")
    private CategoriaInstrumento categoria;


    @OneToMany(mappedBy = "instrumento", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PedidoDetalle> detalles;

    public Instrumento() {
    }

    public Instrumento(String instrumento, String marca, String modelo, String imagen, Double precio, String costoEnvio, Integer cantidadVendida, Boolean activo, String descripcion, CategoriaInstrumento categoria) {
        this.instrumento = instrumento;
        this.marca = marca;
        this.modelo = modelo;
        this.imagen = imagen;
        this.precio = precio;
        this.costoEnvio = costoEnvio;
        this.cantidadVendida = cantidadVendida;
        this.activo = activo;
        this.descripcion = descripcion;
        this.categoria = categoria;
    }

    public Instrumento(Long id, String instrumento, String marca, String modelo, String imagen, Double precio, String costoEnvio, Integer cantidadVendida, Boolean activo, String descripcion, CategoriaInstrumento categoria, List<PedidoDetalle> detalles) {
        this.id = id;
        this.instrumento = instrumento;
        this.marca = marca;
        this.modelo = modelo;
        this.imagen = imagen;
        this.precio = precio;
        this.costoEnvio = costoEnvio;
        this.cantidadVendida = cantidadVendida;
        this.activo = activo;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.detalles = detalles;
    }

    public Long getId() {
        return id;
    }

    public String getInstrumento() {
        return instrumento;
    }

    public void setInstrumento(String instrumento) {
        this.instrumento = instrumento;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public String getCostoEnvio() {
        return costoEnvio;
    }

    public void setCostoEnvio(String costoEnvio) {
        this.costoEnvio = costoEnvio;
    }

    public Integer getCantidadVendida() {
        return cantidadVendida;
    }

    public void setCantidadVendida(Integer cantidadVendida) {
        this.cantidadVendida = cantidadVendida;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public CategoriaInstrumento getCategoria() {
        return categoria;
    }

    public void setCategoria(CategoriaInstrumento categoria) {
        this.categoria = categoria;
    }

    public Boolean isActivo() { return activo;}

    public void setActivo(Boolean activo) { this.activo = activo;}

    public List<PedidoDetalle> getDetalles() {return detalles;}

    public void setDetalles(List<PedidoDetalle> detalles) {this.detalles = detalles;}
}