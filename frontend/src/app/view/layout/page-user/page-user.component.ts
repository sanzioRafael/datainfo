import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { UsuarioService } from 'src/app/core/services/usuario.service';
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

  usuarios: UsuarioModel[] = []
  displayedColumns: string[] = ['email', 'nome', 'perfil', 'habilitado', 'acoes']
  dataSource: MatTableDataSource<UsuarioModel>
  msg = null

  constructor(
    private _service: UsuarioService,
    private _dialog: MatDialog,
  ) { }

  ngOnInit() {
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
      }
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

  private _createDialogCadastro(): MatDialogRef<PageCadastroComponent> {
    return this._dialog.open(PageCadastroComponent, {
      width: '50%',
    })
  }

}
