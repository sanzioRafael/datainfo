import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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

  constructor() { }

  ngOnInit() {
  }

}
