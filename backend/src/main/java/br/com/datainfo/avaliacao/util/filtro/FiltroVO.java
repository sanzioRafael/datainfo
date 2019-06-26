package br.com.datainfo.avaliacao.util.filtro;

import br.com.datainfo.avaliacao.util.enums.Perfil;
import br.com.datainfo.avaliacao.util.enums.Situacao;
import lombok.Data;

@Data
public class FiltroVO {

    private String nome;

    private Situacao situacao;

    private Perfil perfil;

}
