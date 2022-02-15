import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';

export class UsuarioDatos {
	public nombre: string;
	public apellido: string;
	public username: string;
	public foto: string;
}

export class UsuarioPassword {
	public contrasenaActual: string;
	public contrasenaNueva: string;
}

@Component({
	selector: 'app-actualizar-datos',
	templateUrl: './actualizar-datos.page.html',
	styleUrls: ['./actualizar-datos.page.scss'],
})
export class ActualizarDatosPage implements OnInit {
	usuario = new UsuarioDatos();
	password = new UsuarioPassword();
	usuarioLogin: any = [];
	valueSelected = 'datos';

	constructor(
		private router: Router,
		private apiService: ApiService,
		private toastService: ToastService
	) {}

	ngOnInit() {
		this.getUsuario();
	}

	segmentChange(event) {
		this.valueSelected = event.detail.value;
	}

	getUsuario() {
		this.usuarioLogin = JSON.parse(localStorage.getItem('usuario') || '[]');
		this.usuario.nombre = this.usuarioLogin.nombre;
		this.usuario.apellido = this.usuarioLogin.apellido;
		this.usuario.username = this.usuarioLogin.username;
		this.usuario.foto = this.usuarioLogin.foto;
	}

	updateDatos(form) {
		form.value.id = this.usuarioLogin.id;
		this.apiService.update('usuarios/datos', form.value).subscribe(
			(response) => {
				if (response.estado === true) {
					this.toastService.successToast(response.message);
					localStorage.setItem('usuario', JSON.stringify(response.usuario));
					this.router.navigate(['/app/home/mi-cuenta']);
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

	updatePassword(form) {
		form.value.id = this.usuarioLogin.id;
		this.apiService.update('usuarios/password', form.value).subscribe(
			(response) => {
				if (response.estado === true) {
					this.toastService.successToast(response.message);
					this.router.navigate(['/app/home/mi-cuenta']);
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
}
