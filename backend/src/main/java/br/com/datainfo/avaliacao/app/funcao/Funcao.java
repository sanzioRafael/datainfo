package br.com.datainfo.avaliacao.app.funcao;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Data
@Entity
@Table(name = "FUNCAO_USUARIO_EXTERNO")
public class Funcao implements Serializable {

    @Id
    @Column(name = "co_funcao")
    private Integer codigo;

    @Column(name = "no_funcao", length = 50)
    private String nome;

}
