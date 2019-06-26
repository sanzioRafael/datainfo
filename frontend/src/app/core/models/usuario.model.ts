import { FuncaoModel } from './funcao.model';
export class UsuarioModel {
    cpf: string
    nome: string
    email: string
    situacao: string
    perfil: number
    funcao: FuncaoModel
    telefone: string
    habilitado: boolean
}