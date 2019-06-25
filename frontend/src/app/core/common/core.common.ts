export const traducaoData = [
    {
        // Strings e traducoes
        monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        weekdaysFull: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
        weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        format: 'dd/mm/yyyy',

        // Botoes
        today: 'Hoje',
        clear: 'Limpar',
        close: 'Ok',

        selectYears: 5,
        // selectYears: true, // `true` defaults to 10.
        selectMonths: true,
        closeOnSelect: true,
        // max: true, // Using `true` for “today”.
    }
];

export const traducaoDataMesAno = [
    {
        // Strings e traducoes
        monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        weekdaysFull: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
        weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        format: 'mm/yyyy',

        // Botoes
        today: '',
        clear: 'Limpar',
        close: 'Ok',

        // Exibindo seletor de mes e ano
        selectYears: true,
        selectMonths: true,
        klass: {
            box: 'picker__box mes-ano'
        }

    }
];

export enum Perfil {
    Todos = 0,
    'Gestor Nacional' = 1,
    'Gestor Estadual' = 2,
    'Gestor Municipal' = 3
}

export enum Situacao {
    Todos = 'T',
    Habilitado = 'H',
    Desabilitado = 'D'
}