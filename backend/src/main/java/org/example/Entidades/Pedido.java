package org.example.Entidades;


import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "pedido")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date fechaPedido;
    private Double totalPedido;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PedidoDetalle> detalles= new ArrayList<>();

    public Pedido() {
    }

    public Pedido(Long id, Date fechaPedido, Double totalPedido, List<PedidoDetalle> detalles) {
        this.id = id;
        this.fechaPedido = fechaPedido;
        this.totalPedido = totalPedido;
        this.detalles = detalles;
    }

    public Long getId() {return id;}

    public void setId(Long id) {this.id = id;}

    public Date getFechaPedido() {return fechaPedido;}

    public void setFechaPedido(Date fechaPedido) {this.fechaPedido = fechaPedido;}

    public Double getTotalPedido() {return totalPedido;}

    public void setTotalPedido(Double totalPedido) {this.totalPedido = totalPedido;}

    public List<PedidoDetalle> getDetalles() {return detalles;}

    public void setDetalles(List<PedidoDetalle> detalles) {this.detalles = detalles;}

    //Metodo para calcular total
    public void calcularTotal() {
        this.totalPedido = detalles.stream()
                .mapToDouble(detalle -> {
                    String costoEnvioStr = detalle.getInstrumento().getCostoEnvio();
                    Double costo = "G".equalsIgnoreCase(costoEnvioStr) ? 0.0 : Double.parseDouble(costoEnvioStr);
                    Double precio = detalle.getInstrumento().getPrecio() + costo;
                    return precio * detalle.getCantidad();
                })
                .sum();
    }
}
