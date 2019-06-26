package br.com.datainfo.avaliacao.app.usuarioExterno;

import br.com.datainfo.avaliacao.util.enums.Perfil;
import br.com.datainfo.avaliacao.util.enums.Situacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
interface UsuarioExternoRepository extends JpaRepository<UsuarioExterno, String>, CrudRepository<UsuarioExterno, String> {

    List<UsuarioExterno> findAllByNome(String nome);

    List<UsuarioExterno> findAllBySituacao(Situacao situacao);

    List<UsuarioExterno> findAllByPerfil(Perfil perfil);

    List<UsuarioExterno> findAllByNomeAndSituacao(String nome, Situacao situacao);

    List<UsuarioExterno> findAllByNomeAndPerfil(String nome, Perfil perfil);

    List<UsuarioExterno> findAllBySituacaoAndPerfil(Situacao situacao, Perfil perfil);

    List<UsuarioExterno> findAllByNomeAndSituacaoAndPerfil(String nome, Situacao situacao, Perfil perfil);
}
