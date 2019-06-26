package br.com.datainfo.avaliacao.app.usuarioExterno;

import br.com.datainfo.avaliacao.util.enums.Perfil;
import br.com.datainfo.avaliacao.util.enums.Situacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
interface UsuarioExternoRepository extends JpaRepository<UsuarioExterno, String>, CrudRepository<UsuarioExterno, String> {

    List<UsuarioExterno> findAllByNomeOrderByNome(String nome);

    List<UsuarioExterno> findAllBySituacaoOrderByNome(Situacao situacao);

    List<UsuarioExterno> findAllByPerfilOrderByNome(Perfil perfil);

    List<UsuarioExterno> findAllByNomeAndSituacaoOrderByNome(String nome, Situacao situacao);

    List<UsuarioExterno> findAllByNomeAndPerfilOrderByNome(String nome, Perfil perfil);

    List<UsuarioExterno> findAllBySituacaoAndPerfilOrderByNome(Situacao situacao, Perfil perfil);

    List<UsuarioExterno> findAllByNomeAndSituacaoAndPerfilOrderByNome(String nome, Situacao situacao, Perfil perfil);
}
