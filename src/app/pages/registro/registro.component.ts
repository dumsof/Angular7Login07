import { Component, OnInit } from '@angular/core';
import { UsuarioModels } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModels;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {

    this.usuario = new UsuarioModels();
    this.usuario.email = 'dun34@hotmail.com';
  }

  onSubmit(formulario: NgForm) {
    if (formulario.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor ..'

    });
    Swal.showLoading();

    this.auth.nuevoUsuario(this.usuario).subscribe(respuesta => {
      console.log(respuesta);
      console.log('Información registrada con exito.');
      Swal.close();
      this.router.navigateByUrl('/home');
    }, (errores) => {
      console.log('Hay un error: ' + errores.error.error.message);
      Swal.fire({
        title: 'Error al Autenticar',
        type: 'error',
        text: 'Hay un error: ' + errores.error.error.message

      });
    });
  }
}
