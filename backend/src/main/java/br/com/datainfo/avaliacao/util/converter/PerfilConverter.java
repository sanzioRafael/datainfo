package br.com.datainfo.avaliacao.util.converter;

import br.com.datainfo.avaliacao.util.enums.Perfil;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class PerfilConverter implements AttributeConverter<Perfil, Integer> {

    @Override
    public Integer convertToDatabaseColumn(Perfil attribute) {
        return attribute == null ? null : attribute.getCodigo();
    }

    @Override
    public Perfil convertToEntityAttribute(Integer dbData) {
        for (Perfil p : Perfil.values()) {
            if (p.getCodigo().equals(dbData)) return p;
        }
        return null;
    }
}
