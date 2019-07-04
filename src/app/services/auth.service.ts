import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModels } from '../models/usuario.model';

import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apiKey = 'AIzaSyCSxm0KScEDgs23aL1CBdksvBoSZee9LkA';
  userToken: string;
  constructor(private http: HttpClient) { this.leerToken(); }

  logout() {
    localStorage.removeItem('token');
  }

  login(usuario: UsuarioModels) {
    const authDate = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(`${this.url}/verifyPassword?key=${this.apiKey}`, authDate).pipe(map(respuesta => {
      this.guardarToken(respuesta['idToken']);
      return respuesta;
    }));
  }

  nuevoUsuario(usuario: UsuarioModels) {
    const authDate = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(`${this.url}/signupNewUser?key=${this.apiKey}`, authDate).pipe(map(respuesta => {
      this.guardarToken(respuesta['idToken']);
      return respuesta;
    }));
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    /* 3600, esto equivale a 1 hora que es el tiempo de expiracion que envia el servicio,
    se trabaja con una constante debido que siempre envia un 3600 una hora */
    hoy.setSeconds(3600);
    /* almacenar la fecha a futuro la cual expira el token depues que se creo seria una hora */
    localStorage.setItem('expiraToken', hoy.getTime().toString());

  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  estaAutenticado(): boolean {

    if (this.userToken.length < 2) {
      return false;
    }
    /* se obtiene la fecha en la cual expira el token y se realiza la validacion para saber si este expiro */
    const expira = Number(localStorage.getItem('expiraToken'));
    const fechaExpira = new Date();
    fechaExpira.setTime(expira);

    if (fechaExpira > new Date()) {
      return true;
    }

    return false;
  }
}

//crear un nuevo usuario
//https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]

//Login
//https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]