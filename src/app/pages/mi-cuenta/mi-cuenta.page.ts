import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/api/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';

export class Usuario {
	public nombre: string;
	public apellido: string;
	public username: string;
	public foto: string;
}

@Component({
	selector: 'app-mi-cuenta',
	templateUrl: './mi-cuenta.page.html',
	styleUrls: ['./mi-cuenta.page.scss'],
})
export class MiCuentaPage implements OnInit {
	usuario = new Usuario();
	usuarioLogin: any = [];

	constructor(
		private router: Router,
		private authService: AuthService,
		private toastService: ToastService
	) {}

	ngOnInit() {
		this.getUsuario();
	}

	getUsuario() {
		this.usuarioLogin = JSON.parse(localStorage.getItem('usuario') || '[]');
		this.usuario.nombre = this.usuarioLogin.nombre;
		this.usuario.apellido = this.usuarioLogin.apellido;
		this.usuario.username = this.usuarioLogin.username;
		this.usuario.foto = this.usuarioLogin.foto;
	}

	updateDatos() {
		this.router.navigate(['/app/home/mi-cuenta/actualizar-datos']);
	}

	cerrarSesion() {
		this.toastService.successToast('Ha cerrado exitosamente la sesión.');
		this.authService.cerrarSesion();
	}

	ionViewWillEnter() {
		this.getUsuario();
	}
}
