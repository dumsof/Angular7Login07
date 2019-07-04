import { Component, OnInit } from '@angular/core';
import { NgForm, EmailValidator } from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { UsuarioModels } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModels = new UsuarioModels();
  recordarme = false;

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    /*  con esta codificación permite utilizar el check de this.recordarme,
     para que almacene la informacion del Email */
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login(formulario: NgForm) {
    if (formulario.invalid) {
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor ..'

    });
    Swal.showLoading();
    this.auth.login(this.usuario).subscribe(respuesta => {
      console.log(respuesta);
      Swal.close();

      if (this.recordarme) {
        localStorage.setItem('email', this.usuario.email);
      }

      this.router.navigateByUrl('/home');
    }, (errores) => {
      Swal.fire({
        title: 'Error al Autenticar',
        type: 'error',
        text: 'Hay un error: ' + errores.error.error.message

      });
      console.log('Hay un error: ' + errores.error.error.message);
    });
  }
}
