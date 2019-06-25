export class Mask {
    pis: any
    cpf: any
    date: any
    telefone: any
    cep: any

    constructor() {
        this.pis = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/, '-', /\d/]
        this.cpf = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
        this.date = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
        this.telefone = rawValue => this._numberMask(rawValue)
        this.cep = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]
    }

    private _numberMask(userInput) {
        let numbers = userInput.match(/\d/g)
        let numberLength = 0
        if (numbers) numberLength = numbers.join("").length

        if (numberLength > 10) {
            return ['(', /[1-9]/, /[1-9]/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
        } else {
            return ['(', /[1-9]/, /[1-9]/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
        }
    }
}