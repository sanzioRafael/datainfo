package br.com.datainfo.avaliacao.app.usuarioExterno;

import br.com.datainfo.avaliacao.util.Mensagem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UsuarioExternoService {

    @Autowired
    private UsuarioExternoRepository usuarioExternoRepository;

    @Transactional
    public Mensagem cadastrarUsuario(UsuarioExterno usuarioExterno) {
        usuarioExterno = usuarioExternoRepository.save(usuarioExterno);
        return new Mensagem("MN001");
    }

    public List<UsuarioExterno> listarTodos() {
        return usuarioExternoRepository.findAll();
    }

}
