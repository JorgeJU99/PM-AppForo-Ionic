import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/api/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';

export class Login {
	public username: string;
	public userpassword: string;
}

export class Usuario {
	public nombre: string;
	public apellido: string;
	public username: string;
	public userpassword: string;
	public foto: string;
}

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	login = new Login();
	usuario = new Usuario();
	valueSelected = 'login';

	constructor(
		private router: Router,
		private apiService: ApiService,
		private authService: AuthService,
		private toastService: ToastService
	) {}

	ngOnInit() {}

	segmentChange(event) {
		this.valueSelected = event.detail.value;
	}

	loginUser(form) {
		this.authService.iniciarSesion(form.value).subscribe(
			(response) => {
				if (response.estado === true) {
					this.toastService.successToast(response.message);
					localStorage.setItem('token', response.token);
					localStorage.setItem('usuario', JSON.stringify(response.usuario));
					this.router.navigate(['/app/home']);
				}
				if (response.estado === false) {
					this.toastService.errorToast(response.message);
				}
			},
			(error) => {
				this.toastService.errorToast(error.error.message);
			}
		);
	}

	registerUser(form) {
		this.apiService.save('usuarios', form.value).subscribe(
			(response) => {
				if (response.estado === true) {
					this.toastService.successToast(response.message);
					this.resetRegisterForm();
					this.valueSelected = 'login';
				}
				if (response.estado === false) {
					this.toastService.errorToast(response.message);
				}
			},
			(error) => {
				this.toastService.errorToast(error.error.message);
			}
		);
	}

	resetRegisterForm() {
		this.usuario.nombre = '';
		this.usuario.apellido = '';
		this.usuario.username = '';
		this.usuario.userpassword = '';
		this.usuario.foto = '';
	}
}
