package org.example.RepositorioJPA;

import org.example.Entidades.Rol;
import org.example.Entidades.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {
    Usuario findByNombreUsuarioAndClave(String nombreUsuario, String clave);
    Usuario findByNombreUsuarioAndRol(String nombreUsuario, Rol rol);
}
