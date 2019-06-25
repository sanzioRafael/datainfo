package br.com.datainfo.avaliacao.util.converter;

import br.com.datainfo.avaliacao.util.enums.Situacao;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class SituacaoConverter implements AttributeConverter<Situacao, Character> {

    @Override
    public Character convertToDatabaseColumn(Situacao attribute) {
        return attribute == null ? attribute.getCodigo() : null;
    }

    @Override
    public Situacao convertToEntityAttribute(Character dbData) {
        for (Situacao s : Situacao.values()) {
            if (s.getCodigo().equals(dbData)) return s;
        }
        return null;
    }
}
