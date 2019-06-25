import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';

@Injectable()
export class UsuarioService {

  constructor(private _http: HttpClient) { }

  listar(): Observable<UsuarioModel[]> {
    const url = environment.api_endpoint + "usuario/listar"
    return this._http.get<UsuarioModel[]>(url)
  }

}
