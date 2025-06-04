package org.example.Service;


import org.example.Entidades.Pedido;
import org.example.Entidades.PedidoDetalle;
import org.example.RepositorioJPA.InstrumentoRepositorio;
import org.example.RepositorioJPA.PedidoRepositorio;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.transaction.Transactional;

import java.util.Date;


@Service
public class PedidoService {

    @Autowired
    private PedidoRepositorio pedidoRepositorio;

    @Autowired
    private InstrumentoRepositorio instrumentoRepositorio;

    //Buscar pedido por id
    public Pedido buscarPedidoPorId(Long id) {
        return pedidoRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado con el ID: " + id));
    }

    //Crear pedido
    @Transactional
    public Pedido crearPedido(Pedido pedido) {
        pedido.setFechaPedido(new Date());

        for (PedidoDetalle detalle: pedido.getDetalles()){
            detalle.setPedido(pedido);
        }
        pedido.calcularTotal();
        return pedidoRepositorio.save(pedido);
    }

}

