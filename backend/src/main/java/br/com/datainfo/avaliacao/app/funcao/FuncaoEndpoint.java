package br.com.datainfo.avaliacao.app.funcao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/funcao")
class FuncaoEndpoint {

    @Autowired
    private FuncaoService funcaoService;

    @GetMapping("/listar")
    private List<Funcao> listar() {
        return funcaoService.listarTodos();
    }

}
