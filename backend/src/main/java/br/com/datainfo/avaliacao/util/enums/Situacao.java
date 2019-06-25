package br.com.datainfo.avaliacao.util.enums;

public enum Situacao {

    TODOS('T', "Todos"),
    HABILITADO('H', "Habilitado"),
    DEBITO('D', "Desabilitado");

    private Character codigo;

    private String descricao;

    Situacao(Character codigo, String descricao) {
        this.codigo = codigo;
        this.descricao = descricao;
    }

    public Character getCodigo() {
        return codigo;
    }

    public String getDescricao() {
        return descricao;
    }

}
