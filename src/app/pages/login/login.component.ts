import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginModels } from '../../models/login.model';
import { UsuarioModels } from '../../models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModels = new UsuarioModels();
  constructor() { }

  ngOnInit() {
  }

  login(formulario: NgForm) {
    if (formulario.invalid) {
      return;
    }
    console.log('formulario enviado');
    console.log(this.usuario);

  }
}
