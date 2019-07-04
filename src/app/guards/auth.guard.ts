import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

/* esta clase permite validar que para acceder a una ruta el usuario este autenticado,
esto con el fin si el usuario conoce la ruta el sistem no le permita ingresar a la
misma si este no esta autenticado. 
NOTA: para que la validacion funcione se debe implementar en el archivo de ruta en la
ruta la cual se desea que el sistema valide que este autenticado.
*/
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) { }

  canActivate(): boolean {
    /* el sistema valida que si esta autenticado permita seguir a la pagina a la cual se 
    le agrego la condicion del canactivate en el archivo de las rutas, sino el sistema direcciona al login */
    if (this.auth.estaAutenticado()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
