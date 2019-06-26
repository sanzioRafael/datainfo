import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import * as global from './../../../core/common/core.common';
import { UsuarioModel } from './../../../core/models/usuario.model';
import { PageCadastroComponent } from './page-cadastro/page-cadastro.component';

@Component({
  selector: 'app-page-user',
  templateUrl: './page-user.component.html',
  styleUrls: ['./page-user.component.scss']
})
export class PageUserComponent implements OnInit {

  pesquisa: FormGroup = new FormGroup({
    nome: new FormControl(null),
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

  filtrar() {

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
      this._resposta(res.message)
    })
  }

  alterarSituacao(usuario: UsuarioModel) {
    usuario.situacao = global.Situacao[usuario.situacao] == global.Situacao.Desabilitado ? global.Situacao.Habilitado : global.Situacao.Desabilitado
    this._service.atualizarSituacao(usuario).subscribe(res => {
      this._resposta(res.message)
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
      txt.innerHTML = this.msg
      this.msg = txt.value
    }
  }

  private _resposta(msg) {
    this._listar()
    this.msg = msg
    this._tratarMensagem()
  }

}
