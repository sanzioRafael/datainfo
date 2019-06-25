import { CoreInterceptor } from './core.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FuncaoService } from './services/funcao.service';
import { UsuarioService } from './services/usuario.service';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    UsuarioService,
    FuncaoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CoreInterceptor,
      multi: true
    },
  ]
})
export class CoreModule { }
