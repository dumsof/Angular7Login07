import { Component, OnInit } from '@angular/core';
import { UsuarioModels } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModels;

  constructor() { }

  ngOnInit() {

    this.usuario = new UsuarioModels();
    this.usuario.email = 'dun34@hotmail.com';
  }


}
