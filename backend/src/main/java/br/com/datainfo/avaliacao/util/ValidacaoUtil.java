package br.com.datainfo.avaliacao.util;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;

@SuppressWarnings("rawtypes")
public class ValidacaoUtil {

    /**
     * Utilizado para verificar se um a lista é valida.
     */
    public static boolean listaValida(List lista) {

        if (lista != null && !lista.isEmpty()) {
            return true;
        }
        return false;
    }

    /**
     * Utilizado para verificar se um a lista é valida.
     */
    public static boolean listaValida(Set lista) {

        if (lista != null && !lista.isEmpty()) {
            return true;
        }
        return false;
    }

    /**
     * Utilizado para verificar se um a array é valido.
     */
    public static boolean arrayValido(Object[] array) {

        if (array != null && array.length > 0) {
            return true;
        }
        return false;
    }

    /**
     * Utilizado para verificar se um id String é validao.
     */
    public static boolean idStringValido(String id) {

        if (id != null && !id.trim().equals("")) {
            try {
                new Long(id);
                return true;
            } catch (NumberFormatException e) {
            }
        }
        return false;
    }

    /**
     * Utilizado para verificar se um id Integer é validao.
     */
    public static boolean integerValido(Integer id) {

        if (id != null && id > 0) {

            return true;
        }
        return false;
    }

    /**
     * Utilizado para verificar se um id Integer é validao.
     */
    public static boolean longValido(Long id) {

        if (id != null && id > 0) {

            return true;
        }
        return false;
    }

    /**
     * Utilizado para verificar se um id Integer é valido.
     */
    public static boolean dominioIntegerValido(Integer id) {

        if (id != null && id != 0) {

            return true;
        }
        return false;
    }

    /**
     * Utilizado para verificar se o texto é válido.
     */
    public static boolean stringValido(String texto) {

        if (texto != null && !texto.trim().equals("")) {
            return true;
        }
        return false;
    }

    /**
     * Utilizado para verificar se as string passadas são iguais.
     */
    public static boolean stringIguais(String primeira, String segunda) {

        if (primeira != null && segunda != null) {
            return primeira.equals(segunda);
        }
        return false;
    }

    /**
     * Utilizado para verificar se é uma data válida
     */
    public static boolean dataValido(Date date) {

        if (date != null && date.getTime() > 0) {
            return true;
        }
        return false;
    }

    /**
     * Metodo para validar numero de CPF
     *
     * @param numeroCPF "numero do CPF"
     * @return "true" numero valido "false" numero invalido
     * @throws Exception
     */
    public static Boolean validaCPF(String numeroCPF) {

        if (!ValidacaoUtil.stringValido(numeroCPF)) {
            return false;
        }
        numeroCPF = retiraMascara(numeroCPF.trim());

        if (numeroCPF.length() != 11)
            return false;

        if (numeroCPF.equals("00000000000") || numeroCPF.equals("11111111111")
                || numeroCPF.equals("22222222222") || numeroCPF.equals("33333333333")
                || numeroCPF.equals("44444444444") || numeroCPF.equals("55555555555")
                || numeroCPF.equals("66666666666") || numeroCPF.equals("77777777777")
                || numeroCPF.equals("88888888888") || numeroCPF.equals("99999999999")) {
            return false;
        }

        int d1, d2;
        int digito1, digito2, resto;
        int digitoCPF;
        String nDigResult;

        d1 = d2 = 0;
        digito1 = digito2 = resto = 0;

        try {

            for (int nCount = 1; nCount < numeroCPF.length() - 1; nCount++) {
                digitoCPF = Integer.valueOf(
                        numeroCPF.substring(nCount - 1, nCount)).intValue();

                // multiplique a ultima casa por 2 a seguinte por 3 a seguinte
                // por 4
                // e assim por diante.
                d1 = d1 + (11 - nCount) * digitoCPF;

                // para o segundo digito repita o procedimento incluindo o
                // primeiro
                // digito calculado no passo anterior.
                d2 = d2 + (12 - nCount) * digitoCPF;
            }

            // Primeiro resto da divisão por 11.
            resto = (d1 % 11);

            // Se o resultado for 0 ou 1 o digito é 0 caso contrário o digito é
            // 11
            // menos o resultado anterior.
            if (resto < 2)
                digito1 = 0;
            else
                digito1 = 11 - resto;

            d2 += 2 * digito1;

            // Segundo resto da divisão por 11.
            resto = (d2 % 11);

            // Se o resultado for 0 ou 1 o digito é 0 caso contrário o digito é
            // 11
            // menos o resultado anterior.
            if (resto < 2) {
                digito2 = 0;
            } else {
                digito2 = 11 - resto;
            }

            // Digito verificador do CPF que está sendo validado.
            String nDigVerific = numeroCPF.substring(numeroCPF.length() - 2,
                    numeroCPF.length());

            // Concatenando o primeiro resto com o segundo.
            nDigResult = String.valueOf(digito1) + String.valueOf(digito2);

            // comparar o digito verificador do cpf com o primeiro resto + o
            // segundo
            // resto.
            return nDigVerific.equals(nDigResult);

        } catch (Exception e) {
            e.getStackTrace();
            return false;
        }
    }

    public static Boolean validaCNPJ(String strCnpj) {

        if (!ValidacaoUtil.stringValido(strCnpj)) {
            return false;
        }
        strCnpj = retiraMascara(strCnpj.trim());

        boolean valid;
        int soma1, soma2, d1, d2, i, j, k, c;

        valid = Pattern.compile("[0-9]{14}").matcher(strCnpj).matches();

        if (valid) {
            soma2 = soma1 = 0;
            for (i = 11, j = 2, k = 3; i >= 0; i--) {
                c = strCnpj.charAt(i) - '0';
                soma1 += c * j;
                soma2 += c * k;
                j = (j + 1) % 10;
                if (j == 0) {
                    j = 2;
                }
                k = (k + 1) % 10;
                if (k == 0) {
                    k = 2;
                }
            }

            d1 = soma1 % 11;
            if (d1 < 2) {
                d1 = 0;
            } else {
                d1 = 11 - d1;
            }

            soma2 += d1 * 2;
            d2 = soma2 % 11;
            if (d2 < 2) {
                d2 = 0;
            } else {
                d2 = 11 - d2;
            }

            valid = strCnpj.charAt(12) - '0' == d1
                    && strCnpj.charAt(13) - '0' == d2;
        }
        return valid;
    }

    /**
     * Retira máscara de formatação da string e também retira caracteres fora do
     * intervalo 32-127
     *
     * @param str String que terá a máscara retirada
     * @return String Sem máscara
     */
    public static String retiraMascara(String str) {

        StringBuffer sb = new StringBuffer(str);
        String aux = "";
        String charMasc = "./\\-\",:(){}[]%'";
        int i, indice;
        char c;
        try {
            aux = str;
            for (i = 0; i < charMasc.length(); i++) {
                c = charMasc.charAt(i);
                while ((indice = aux.indexOf(c)) != -1) {
                    sb.deleteCharAt(indice);
                    aux = sb.toString();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return aux;
    }

    public static boolean validaTamanhoString(String str, int tamanhoMaxStr) {
        if (str != null && !str.equals("") && str.length() > 0)
            return str.length() <= tamanhoMaxStr;
        else
            return false;
    }

    public static boolean tipoArquivoValido(String str) {
        if (str.endsWith("doc") || str.endsWith("DOC") ||
                str.endsWith("docx") || str.endsWith("DOCX") ||
                str.endsWith("rtf") || str.endsWith("RTF") ||
                str.endsWith("txt") || str.endsWith("TXT") ||
                str.endsWith("xls") || str.endsWith("XLS") ||
                str.endsWith("xlsx") || str.endsWith("XLSX") ||
                str.endsWith("pdf") || str.endsWith("PDF") ||
                str.endsWith("odt") || str.endsWith("ODT") ||
                str.endsWith("ods") || str.endsWith("ODS") ||
                str.endsWith("jpg") || str.endsWith("JPG") ||
                str.endsWith("jpeg") || str.endsWith("JPEG") ||
                str.endsWith("bmp") || str.endsWith("BMP") ||
                str.endsWith("gif") || str.endsWith("GIF") ||
                str.endsWith("png") || str.endsWith("PNG") ||
                str.endsWith("rar") || str.endsWith("RAR") ||
                str.endsWith("zip") || str.endsWith("ZIP") ||
                str.endsWith("mpg") || str.endsWith("MPG") ||
                str.endsWith("mpeg") || str.endsWith("MPEG") ||
                str.endsWith("avi") || str.endsWith("AVI"))
            return true;
        else
            return false;
    }
}
