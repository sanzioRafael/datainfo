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

    @GetMapping(value = "/listar")
    public List<UsuarioExterno> listar() {
        return usuarioExternoService.listarTodos();
    }

    @PostMapping(value = "/cadastrar")
    public Mensagem cadastrar(@Valid @RequestBody UsuarioExterno usuarioExterno) {
        return usuarioExternoService.cadastrarUsuario(usuarioExterno);
    }

    @PutMapping(value = "/atualizar")
    public Mensagem atualizar(@Valid @RequestBody UsuarioExterno usuarioExterno) {
        return usuarioExternoService.atualizarUsuario(usuarioExterno);
    }

    @DeleteMapping(value = "/deletar/{cpf}")
    public Mensagem deletar(@PathVariable("cpf") String cpf) {
        return usuarioExternoService.deletarUsuario(cpf);
    }

}
