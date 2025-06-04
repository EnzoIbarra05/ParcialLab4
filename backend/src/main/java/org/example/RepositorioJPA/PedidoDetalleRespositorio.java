package org.example.RepositorioJPA;

import org.example.Entidades.PedidoDetalle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoDetalleRespositorio extends JpaRepository<PedidoDetalle, Long> {
}
