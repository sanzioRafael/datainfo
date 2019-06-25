import { environment } from './../../../environments/environment';
import { FuncaoModel } from './../models/funcao.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FuncaoService {

  constructor(private _http: HttpClient) { }

  listar(): Observable<FuncaoModel[]> {
    const url = environment.api_endpoint + "funcao/listar"
    return this._http.get<FuncaoModel[]>(url)
  }

}
