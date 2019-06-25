import { UsuarioModel } from './../../../../core/models/usuario.model';
import * as global from './../../../../core/common/core.common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Mask } from './../../../../core/models/mask.model';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ValidateBrService } from 'angular-validate-br';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { FuncaoService } from 'src/app/core/services/funcao.service';
import { FuncaoModel } from 'src/app/core/models/funcao.model';

@Component({
  selector: 'app-page-cadastro',
  templateUrl: './page-cadastro.component.html',
  styleUrls: ['./page-cadastro.component.scss']
})
export class PageCadastroComponent implements OnInit {

  mask = new Mask()
  funcoes: FuncaoModel[] = []
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(255)]),
    nome: new FormControl(null, [Validators.required, this._validateBrService.propName, Validators.maxLength(60)]),
    cpf: new FormControl(null, [Validators.required, this._validateBrService.cpf]),
    telefone: new FormControl(null, [Validators.required]),
    funcao: new FormControl(null, Validators.required),
    perfil: new FormControl(null, Validators.required),
  })
  perfis: string[] = Object.keys(global.Perfil)

  constructor(
    private _dialofRef: MatDialogRef<PageCadastroComponent>,
    private _validateBrService: ValidateBrService,
    private _service: UsuarioService,
    private _funcaoService: FuncaoService,
  ) { }

  ngOnInit() {
    this._inicializar()
  }

  cadastrar() {
    if (this.form.valid) {
      let u = new UsuarioModel()
      let funcao = this.form.controls.funcao.value

      this.funcoes.forEach(f => {
        if (funcao == f.codigo) funcao = f
      })

      u.email = this.form.controls.email.value.trim()
      u.nome = this.form.controls.nome.value.trim()
      u.cpf = this.form.controls.cpf.value.replace(/\D+/g, "").trim()
      u.telefone = this.form.controls.telefone.value.replace(/\D+/g, "").trim()
      u.funcao = funcao
      u.perfil = parseInt(global.Perfil[this.form.controls.perfil.value])
      u.situacao = global.Situacao['Desabilitado']
      this._service.incluirUsuario(u).subscribe(res => {
        this._dialofRef.close(res.message)
      })
    }
  }

  sair() {
    this.form.reset()
    this._dialofRef.close(null)
  }

  private _inicializar() {
    this.perfis = this.perfis.slice(this.perfis.length / 2)
    this._funcaoService.listar().subscribe(f => this.funcoes = f)
  }

}
