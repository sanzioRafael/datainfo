import { PageUserComponent } from './layout/page-user/page-user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';
import { PageHomeComponent } from './layout/page-home/page-home.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConvalentModule } from './convalent.module';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from './material.module';
import { CoreModule } from '../core/core.module';

const Components = [
  LayoutComponent,
  PageHomeComponent,
  PageUserComponent,
];

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children:
      [
        { path: "home", component: PageHomeComponent },
        { path: "user", component: PageUserComponent },
      ],
    data: { reuse: true }
  },
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    ConvalentModule,
    MaterialModule,
    CoreModule,
    RouterModule.forChild(routes),
  ],
  declarations: Components,
  exports: [RouterModule],
  entryComponents: [Components],
})
export class ViewModule { }
