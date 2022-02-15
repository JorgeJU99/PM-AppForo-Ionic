import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private url = 'http://localhost:3000/';

	constructor(private http: HttpClient) {}

	iniciarSesion(user): any {
		return this.http.post<any>(this.url + 'usuarios/login', user);
	}

	cerrarSesion(): any {
		localStorage.removeItem('token');
		localStorage.removeItem('usuario');
	}

	loggedIn(): any {
		return !!localStorage.getItem('token');
	}

	getToken(): any {
		return localStorage.getItem('token');
	}
}
