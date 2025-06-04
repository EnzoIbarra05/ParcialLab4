package org.example.Entidades;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
public class PedidoDetalle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private int cantidad;

    @ManyToOne
    @JoinColumn(name="pedido_id")
    @JsonIgnoreProperties("detalles")
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name="instrumento_id")
    @JsonIgnoreProperties("detalles")
    private Instrumento instrumento;

    public PedidoDetalle() {
    }

    public PedidoDetalle(long id, int cantidad, Pedido pedido, Instrumento instrumento) {
        this.id = id;
        this.cantidad = cantidad;
        this.pedido = pedido;
        this.instrumento = instrumento;
    }

    public long getId() {return id;}

    public void setId(long id) {this.id = id;}

    public int getCantidad() {return cantidad;}

    public void setCantidad(int cantidad) {this.cantidad = cantidad;}

    public Pedido getPedido() {return pedido;}

    public void setPedido(Pedido pedido) {this.pedido = pedido;}

    public Instrumento getInstrumento() {return instrumento;}

    public void setInstrumento(Instrumento instrumento) {this.instrumento = instrumento;}
}



