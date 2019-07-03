import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModels } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModels = new UsuarioModels();
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login(formulario: NgForm) {
    if (formulario.invalid) {
      return;
    }
    this.auth.login(this.usuario).subscribe(respuesta => {
      console.log(respuesta);
    }, (errores) => {
      console.log('Hay un error: ' + errores.error.error.message);
    });
  }
}
