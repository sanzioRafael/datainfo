package br.com.datainfo.avaliacao.util.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Arrays;

@JsonFormat(shape = JsonFormat.Shape.NUMBER)
public enum Perfil {

    TODOS(0, "Todos"),
    GESTOR_NACIONAL(1, "Gestor Nacional"),
    GESTOR_ESTADUAL(2, "Gestor Estadual"),
    GESTOR_MUNICIPAL(3, "Gestor Municipal");

    private Integer codigo;

    private String descricao;

    Perfil(Integer codigo, String descricao) {
        this.codigo = codigo;
        this.descricao = descricao;
    }

    public Integer getCodigo() {
        return codigo;
    }

    public String getDescricao() {
        return descricao;
    }

    @JsonCreator
    static Situacao findValue(
            @JsonProperty("perfil") String codigo
    ) {
        return Arrays.stream(Situacao.values()).filter(
                Situacao -> Situacao.getCodigo().toString().equals(codigo))
                .findFirst().get();
    }

}
