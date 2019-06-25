package br.com.datainfo.avaliacao.app.usuarioExterno;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
interface UsuarioExternoRepository extends JpaRepository<UsuarioExterno, String>, CrudRepository<UsuarioExterno, String> {
}
