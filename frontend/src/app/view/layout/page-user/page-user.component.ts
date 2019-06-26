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
  situacaoes: string[] = Object.keys(global.Situacao)

  usuarios: UsuarioModel[] = []
  displayedColumns: string[] = ['email', 'nome', 'perfil', 'habilitado', 'acoes']
  dataSource: MatTableDataSource<UsuarioModel>
  private msg = null

  constructor(
    private _service: UsuarioService,
    private _dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.perfis = this.perfis.slice(this.perfis.length / 2)
    this.situacaoes = this.situacaoes.slice(this.situacaoes.length / 2)
    this._listar()
  }

  filtrar() {

  }

  exibirCadastro() {
    const dialogRef = this._createDialogCadastro()
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._listar()
        this.msg = result
        this._tratarMensagem()
      }
    })
  }

  exibirAlteracao(usuario: UsuarioModel) {
    const dialogRef = this._createDialogCadastro(usuario)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._listar()
        this.msg = result
        this._tratarMensagem()
      }
    })
  }

  deletarUsuario(usuario: UsuarioModel) {
    this._service.deletarUsuario(usuario.cpf).subscribe(res => {
      this._listar()
      this.msg = res.message
      this._tratarMensagem()
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

}
