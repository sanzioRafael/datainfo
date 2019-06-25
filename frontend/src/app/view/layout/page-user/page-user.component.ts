import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ValidateBrService } from 'angular-validate-br';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { UsuarioModel } from './../../../core/models/usuario.model';

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

  constructor(
    private _service: UsuarioService,
    private _router: Router,
    private _validateBrService: ValidateBrService
  ) { }

  ngOnInit() {
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

  filtrar() {

  }

}
