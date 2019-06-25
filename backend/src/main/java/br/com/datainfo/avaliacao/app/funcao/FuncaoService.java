package br.com.datainfo.avaliacao.app.funcao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FuncaoService {

    @Autowired
    private FuncaoRepository funcaoRepository;

    public List<Funcao> listarTodos() {
        return funcaoRepository.findAll();
    }

}
