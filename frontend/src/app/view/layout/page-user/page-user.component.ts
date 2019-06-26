import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import * as global from './../../../core/common/core.common';
import { UsuarioModel } from './../../../core/models/usuario.model';
import { PageCadastroComponent } from './page-cadastro/page-cadastro.component';
import { ValidateBrService } from 'angular-validate-br';
import { FiltroModel } from 'src/app/core/models/filtro.model';

@Component({
  selector: 'app-page-user',
  templateUrl: './page-user.component.html',
  styleUrls: ['./page-user.component.scss']
})
export class PageUserComponent implements OnInit {

  pesquisa: FormGroup = new FormGroup({
    nome: new FormControl(null, [this._validateBrService.propName, Validators.maxLength(60)]),
    situacao: new FormControl(null),
    perfil: new FormControl(null)
  })
  perfis: string[] = Object.keys(global.Perfil)
  situacoes: string[] = Object.keys(global.Situacao)

  usuarios: UsuarioModel[] = []
  displayedColumns: string[] = ['email', 'nome', 'perfil', 'habilitado', 'acoes']
  dataSource: MatTableDataSource<UsuarioModel>
  msg = null

  constructor(
    private _validateBrService: ValidateBrService,
    private _service: UsuarioService,
    private _dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.perfis = this.perfis.slice(this.perfis.length / 2)
    this._listar()
  }

  perfil(v: number): string {
    return global.Perfil[v]
  }

  situacao(v: string): string {
    return global.Situacao[v]
  }

  isHabilitado(v: string): boolean {
    return global.Situacao[v] == global.Situacao.Habilitado
  }

  controlInvalid(controlName: string): boolean {
    return this.pesquisa.get(controlName).invalid
  }

  filtrar() {
    let filtro = new FiltroModel()

    filtro.nome = this.pesquisa.controls.nome.value
    filtro.situacao = this.pesquisa.controls.situacao.value == null ? global.Situacao.Todos : global.Situacao[this.pesquisa.controls.situacao.value]
    filtro.perfil = this.pesquisa.controls.perfil.value == null ? global.Perfil.Todos : parseInt(global.Perfil[this.pesquisa.controls.perfil.value])
    
  }

  exibirCadastro() {
    const dialogRef = this._createDialogCadastro()
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._resposta(result)
      }
    })
  }

  exibirAlteracao(usuario: UsuarioModel) {
    const dialogRef = this._createDialogCadastro(usuario)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._resposta(result)
      }
    })
  }

  deletarUsuario(usuario: UsuarioModel) {
    this._service.deletarUsuario(usuario.cpf).subscribe(res => {
      let msg = {
        label: res.message.startsWith("Opera") ? "Erro" : "Sucesso",
        sublabel: res.message,
        icon: res.message.startsWith("Opera") ? "error" : "info"
      }
      this._resposta(msg)
    })
  }

  alterarSituacao(usuario: UsuarioModel) {
    usuario.situacao = global.Situacao[usuario.situacao] == global.Situacao.Desabilitado ? global.Situacao.Habilitado : global.Situacao.Desabilitado
    this._service.atualizarSituacao(usuario).subscribe(res => {
      let msg = {
        label: res.message.startsWith("Opera") ? "Erro" : "Sucesso",
        sublabel: res.message,
        icon: res.message.startsWith("Opera") ? "error" : "info"
      }
      this._resposta(msg)
    })
  }

  private _listar() {
    this.dataSource = new MatTableDataSource()
    this._service.listar().subscribe(
      u => {
        this.usuarios = u
        this.dataSource = new MatTableDataSource(this.usuarios)
      },
      error => {
        console.log(error)
        this.usuarios = []
      }
    )
  }

  private _createDialogCadastro(usuario: UsuarioModel = null): MatDialogRef<PageCadastroComponent> {
    return this._dialog.open(PageCadastroComponent, {
      width: '50%',
      data: usuario
    })
  }

  private _tratarMensagem() {
    if (this.msg) {
      let txt = document.createElement("textarea")
      txt.innerHTML = this.msg.sublabel
      this.msg.sublabel = txt.value
    }
  }

  private _resposta(msg) {
    this._listar()
    this.msg = msg
    this._tratarMensagem()
  }

}
