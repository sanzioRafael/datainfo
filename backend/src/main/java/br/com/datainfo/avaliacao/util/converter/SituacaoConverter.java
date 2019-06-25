package br.com.datainfo.avaliacao.util.converter;

import br.com.datainfo.avaliacao.util.enums.Situacao;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class SituacaoConverter implements AttributeConverter<Situacao, String> {

    @Override
    public String convertToDatabaseColumn(Situacao attribute) {
        return attribute == null ? null : attribute.getCodigo();
    }

    @Override
    public Situacao convertToEntityAttribute(String dbData) {
        for (Situacao s : Situacao.values()) {
            if (s.getCodigo().equals(dbData)) return s;
        }
        return null;
    }
}
