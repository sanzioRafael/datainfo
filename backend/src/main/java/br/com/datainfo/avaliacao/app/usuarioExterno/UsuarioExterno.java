package br.com.datainfo.avaliacao.app.usuarioExterno;

import br.com.datainfo.avaliacao.app.funcao.Funcao;
import br.com.datainfo.avaliacao.util.enums.Perfil;
import br.com.datainfo.avaliacao.util.enums.Situacao;
import lombok.Data;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.io.Serializable;

@Data
@Entity
@Table(name = "USUARIO_EXTERNO")
public class UsuarioExterno implements Serializable {

    @Id
    @Column(name = "nu_cpf", length = 11, nullable = false)
    private String cpf;

    @Column(name = "no_usuario", length = 60, insertable = false, updatable = false, nullable = false)
    private String nome;

    @Email(message = "Email inválido")
    @Column(name = "de_email", length = 255, nullable = false)
    private String email;

    @Column(name = "ic_situacao", length = 1, nullable = false)
    private Situacao situacao;

    @Column(name = "ic_perfil_acesso", nullable = false, columnDefinition = "SMALLINT")
    private Perfil perfil;

    @ManyToOne
    @JoinColumn(name = "co_funcao", nullable = false)
    private Funcao funcao;

    @Column(name = "nu_telefone", length = 11, nullable = false)
    private String telefone;

}
