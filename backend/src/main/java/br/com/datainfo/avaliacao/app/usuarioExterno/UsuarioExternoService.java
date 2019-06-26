package br.com.datainfo.avaliacao.app.usuarioExterno;

import br.com.datainfo.avaliacao.util.Mensagem;
import br.com.datainfo.avaliacao.util.enums.Situacao;
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

}
