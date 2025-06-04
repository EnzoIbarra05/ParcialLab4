package org.example.Service;

import org.example.Entidades.Usuario;
import org.example.RepositorioJPA.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.Entidades.Rol;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public Usuario validarUsuario(String nombreUsuario, String clave) {
        String claveEncriptada = Usuario.encriptarClave(clave);
        return usuarioRepositorio.findByNombreUsuarioAndClave(nombreUsuario, claveEncriptada);
    }

    public Usuario crearUsuario(Usuario usuario) {
        if (usuarioRepositorio.findByNombreUsuarioAndClave(usuario.getNombreUsuario(), usuario.getClave()) != null) {
            throw new IllegalArgumentException("El nombre de usuario ya está en uso.");
        }
        if (usuario.getRol() == null) {
            throw new IllegalArgumentException("El rol proporcionado no es válido.");
        }

        return usuarioRepositorio.save(usuario);
    }
    public boolean eliminarUsuario(Long idUsuario) {
        if (usuarioRepositorio.existsById(idUsuario)) {
            usuarioRepositorio.deleteById(idUsuario);
            return true;
        }
        return false;
    }
}
