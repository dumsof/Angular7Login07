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

  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }
}

//crear un nuevo usuario
//https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]

//Login
//https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]