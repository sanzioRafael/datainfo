package br.com.datainfo.avaliacao.util;

import java.io.IOException;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

public class Mensagem {

    private String message;

    public Mensagem() {

    }

    public Mensagem(String key, Object... params) {
        try {
            Properties props = new Properties();
            props.load(this.getClass().getResourceAsStream("/msg.properties"));
            if (ValidacaoUtil.arrayValido(params)) {
                this.message = MessageFormat.format(props.getProperty(key), params);
            } else
                this.message = props.getProperty(key);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public static List<Mensagem> atribuirMensagem(String key) {
        List<Mensagem> mensagens = new ArrayList<>();
        mensagens.add(new Mensagem(key));
        return mensagens;
    }

    public static List<Mensagem> obterRespostaException(String message) {
        List<Mensagem> lista = new ArrayList<>();
        Mensagem mensagem = new Mensagem();
        mensagem.setMessage(message);
        lista.add(mensagem);
        return lista;
    }

    @Override
    public String toString() {
        return "{'message':'" + message + "'}";
    }
}