import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: 'view', pathMatch: 'full' },
  { path: 'view', loadChildren: './view/view.module#ViewModule' },
  { path: '**', redirectTo: "view/inicio" },
];
export const routing: ModuleWithProviders = RouterModule
  .forRoot(appRoutes, {
    enableTracing: false,
    useHash: true
  });

