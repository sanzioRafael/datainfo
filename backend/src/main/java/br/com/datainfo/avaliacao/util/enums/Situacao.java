package br.com.datainfo.avaliacao.util.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Arrays;

@JsonFormat(shape = JsonFormat.Shape.STRING)
public enum Situacao {

    TODOS("T", "Todos"),
    HABILITADO("H", "Habilitado"),
    DESABILITADO("D", "Desabilitado");

    private String codigo;

    private String descricao;

    Situacao(String codigo, String descricao) {
        this.codigo = codigo;
        this.descricao = descricao;
    }

    public String getCodigo() {
        return codigo;
    }

    public String getDescricao() {
        return descricao;
    }

    @JsonCreator
    static Situacao findValue(
            @JsonProperty("situacao") String codigo
    ) {
        return Arrays.stream(Situacao.values()).filter(
                Situacao -> Situacao.getCodigo().toString().equals(codigo))
                .findFirst().get();
    }

}