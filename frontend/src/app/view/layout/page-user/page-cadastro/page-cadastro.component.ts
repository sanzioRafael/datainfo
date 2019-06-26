import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ValidateBrService } from 'angular-validate-br';
import { FuncaoModel } from 'src/app/core/models/funcao.model';
import { FuncaoService } from 'src/app/core/services/funcao.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import * as global from './../../../../core/common/core.common';
import { Mask } from './../../../../core/models/mask.model';
import { UsuarioModel } from './../../../../core/models/usuario.model';

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
  titulo = "Incluir"

  constructor(
    private _dialofRef: MatDialogRef<PageCadastroComponent>,
    private _validateBrService: ValidateBrService,
    private _service: UsuarioService,
    private _funcaoService: FuncaoService,
    @Inject(MAT_DIALOG_DATA) private _data: UsuarioModel,
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

      if (this._data) {
        u.situacao = global.Situacao[this._data.situacao]
        this._service.atualizarUsuario(u).subscribe(res => {
          let msg = {
            label: res.message.startsWith("Opera") ? "Erro" : "Sucesso",
            sublabel: res.message,
            icon: res.message.startsWith("Opera") ? "error" : "info"
          }
          this._dialofRef.close(msg)
        })
      } else {
        u.situacao = global.Situacao['Desabilitado']
        this._service.incluirUsuario(u).subscribe(res => {
          let msg = {
            label: res.message.startsWith("Opera") ? "Erro" : "Sucesso",
            sublabel: res.message,
            icon: res.message.startsWith("Opera") ? "error" : "info"
          }
          this._dialofRef.close(msg)
        })
      }
    }
  }

  sair() {
    this.form.reset()
    this._dialofRef.close(null)
  }

  controlInvalid(controlName: string): boolean {
    return this.form.get(controlName).invalid
  }

  private _inicializar() {
    if (this._data) {
      this.titulo = "Editar"
      this.form = new FormGroup({
        email: new FormControl(this._data.email, [Validators.required, Validators.email, Validators.maxLength(255)]),
        nome: new FormControl(this._data.nome, [Validators.required, this._validateBrService.propName, Validators.maxLength(60)]),
        cpf: new FormControl(this._data.cpf, [Validators.required, this._validateBrService.cpf]),
        telefone: new FormControl(this._data.telefone, [Validators.required]),
        funcao: new FormControl(this._data.funcao.codigo, Validators.required),
        perfil: new FormControl(global.Perfil[this._data.perfil], Validators.required),
      })
    }

    this.perfis = this.perfis.slice(this.perfis.length / 2)
    this._funcaoService.listar().subscribe(f => this.funcoes = f)
  }

}
