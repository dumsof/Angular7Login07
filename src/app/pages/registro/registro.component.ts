import { Component, OnInit } from '@angular/core';
import { UsuarioModels } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';

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

  onSubmit(formulario: NgForm) {
    if (formulario.invalid) {
      return;
    }
    console.log('formulario enviado');
    console.log(this.usuario);
  }
}
