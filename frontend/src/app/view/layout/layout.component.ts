import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  navmenu: Object[] = [
    {
      icon: 'home',
      route: 'home',
      title: 'Principal',
      description: 'Tela Inicial',
      checked: false,
    },
    {
      icon: 'people',
      route: 'user',
      title: 'Usuários',
      description: 'Gerenciamento de Usuários',
      checked: false,
    },
  ];

  constructor(
    private _router: Router,
  ) { }

  ngOnInit() {
    this._router.navigate(['home'])
  }

}
