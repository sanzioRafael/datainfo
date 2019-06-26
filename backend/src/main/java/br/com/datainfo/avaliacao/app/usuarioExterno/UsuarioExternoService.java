package br.com.datainfo.avaliacao.app.usuarioExterno;

import br.com.datainfo.avaliacao.util.Mensagem;
import br.com.datainfo.avaliacao.util.enums.Perfil;
import br.com.datainfo.avaliacao.util.enums.Situacao;
import br.com.datainfo.avaliacao.util.filtro.FiltroVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioExternoService {

    @Autowired
    private UsuarioExternoRepository usuarioExternoRepository;

    @Transactional
    public Mensagem cadastrarUsuario(UsuarioExterno usuarioExterno) {
        Optional<UsuarioExterno> u = usuarioExternoRepository.findById(usuarioExterno.getCpf());

        if (u.isPresent()) {
            return new Mensagem("MN034");
        } else {
            usuarioExternoRepository.save(usuarioExterno);
            return new Mensagem("MN001");
        }
    }

    @Transactional
    public Mensagem atualizarUsuario(UsuarioExterno usuarioExterno) {
        usuarioExternoRepository.save(usuarioExterno);
        return new Mensagem("MN030");
    }


    @Transactional
    public Mensagem deletarUsuario(String cpf) {
        usuarioExternoRepository.deleteById(cpf);
        return new Mensagem("MN005");
    }

    @Transactional
    public Mensagem atualizarSituacao(UsuarioExterno usuarioExterno) {
        usuarioExternoRepository.save(usuarioExterno);

        if (usuarioExterno.getSituacao() == Situacao.DESABILITADO)
            return new Mensagem("MN032");
        else
            return new Mensagem("MN033");
    }

    public List<UsuarioExterno> listarTodos() {
        return usuarioExternoRepository.findAll(Sort.by("nome"));
    }

    public List<UsuarioExterno> filtrarTodosPorFiltro(FiltroVO filtro) {
        boolean nome = filtro.getNome() != null && !filtro.getNome().isEmpty();
        boolean situacao = filtro.getSituacao() == Situacao.TODOS ? false : true;
        boolean perfil = filtro.getPerfil() == Perfil.TODOS ? false : true;

        if (nome && situacao && perfil)
            return usuarioExternoRepository.findAllByNomeAndSituacaoAndPerfil(
                    filtro.getNome(), filtro.getSituacao(), filtro.getPerfil());

        if (nome && situacao)
            return usuarioExternoRepository.findAllByNomeAndSituacao(filtro.getNome(), filtro.getSituacao());

        if (nome && perfil)
            return usuarioExternoRepository.findAllByNomeAndPerfil(filtro.getNome(), filtro.getPerfil());

        if (nome) return usuarioExternoRepository.findAllByNome(filtro.getNome());

        if (situacao && perfil)
            return usuarioExternoRepository.findAllBySituacaoAndPerfil(filtro.getSituacao(), filtro.getPerfil());

        if (situacao) return usuarioExternoRepository.findAllBySituacao(filtro.getSituacao());

        if (perfil) return usuarioExternoRepository.findAllBySituacao(filtro.getSituacao());

        return listarTodos();
    }

}
