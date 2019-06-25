package br.com.datainfo.avaliacao.app.usuarioExterno;

import br.com.datainfo.avaliacao.util.Mensagem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/usuario")
class UsuarioExternoEndpoint {

    @Autowired
    private UsuarioExternoService usuarioExternoService;

    @PostMapping(value = "/cadastrar")
    public Mensagem cadastrar(@Valid @RequestBody UsuarioExterno usuarioExterno) {
        return usuarioExternoService.cadastrarUsuario(usuarioExterno);
    }

    @GetMapping(value = "/listar")
    public List<UsuarioExterno> listar() {
        return usuarioExternoService.listarTodos();
    }

}
