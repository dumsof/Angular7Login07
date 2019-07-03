import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModels } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apiKey = 'AIzaSyCSxm0KScEDgs23aL1CBdksvBoSZee9LkA';

  constructor(private http: HttpClient) { }

  logout() {

  }
  login(usuario: UsuarioModels) {

  }

  nuevoUsuario(usuario: UsuarioModels) {
    const authDate = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(`${this.url}/signupNewUser?key=${this.apiKey}`, authDate);
  }
}

//crear un nuevo usuario
//https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]

//Login
//https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]