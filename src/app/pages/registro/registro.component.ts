import { Component, OnInit } from '@angular/core';
import { UsuarioModels } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModels;

  constructor(private auth: AuthService) { }

  ngOnInit() {

    this.usuario = new UsuarioModels();
    this.usuario.email = 'dun34@hotmail.com';
  }

  onSubmit(formulario: NgForm) {
    if (formulario.invalid) {
      return;
    }
    this.auth.nuevoUsuario(this.usuario).subscribe(respuesta => {
      console.log(respuesta);
      console.log('Información registrada con exito.');
    }, (erores) => {
      console.log('Hay un error: ' + erores.error.error.message);
    });
  }
}
