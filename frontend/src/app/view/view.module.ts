import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularValidateBrLibModule } from 'angular-validate-br';
import { TextMaskModule } from 'angular2-text-mask';
import { CoreModule } from '../core/core.module';
import { ConvalentModule } from './convalent.module';
import { LayoutComponent } from './layout/layout.component';
import { PageHomeComponent } from './layout/page-home/page-home.component';
import { PageCadastroComponent } from './layout/page-user/page-cadastro/page-cadastro.component';
import { PageUserComponent } from './layout/page-user/page-user.component';
import { MaterialModule } from './material.module';

const Components = [
  LayoutComponent,
  PageHomeComponent,
  PageUserComponent,
  PageCadastroComponent,
];

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children:
      [
        { path: "inicio", component: PageHomeComponent },
        { path: "usuario", component: PageUserComponent },
      ],
    data: { reuse: true }
  },
  { path: "cadastrar", component: PageCadastroComponent, outlet: 'modal' },
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    ConvalentModule,
    MaterialModule,
    CoreModule,
    TextMaskModule,
    AngularValidateBrLibModule,
    RouterModule.forChild(routes),
  ],
  declarations: Components,
  exports: [RouterModule],
  entryComponents: [Components],
})
export class ViewModule { }
