import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ModalController } from '@ionic/angular';
import { ModalPublicacionesComponent } from './components/modal-publicaciones/modal-publicaciones.component';

export class Usuario {
	public foto: string;
}

@Component({
	selector: 'app-publicaciones',
	templateUrl: './publicaciones.page.html',
	styleUrls: ['./publicaciones.page.scss'],
})
export class PublicacionesPage implements OnInit {
	usuario = new Usuario();
	usuarioLogin: any = [];
	publicaciones: any = [];
	publicacionUsuario: any = [];
	textSearch = '';

	constructor(
		private apiService: ApiService,
		private toastService: ToastService,
		private modalController: ModalController
	) {}

	ngOnInit() {
		this.getUsuario();
		this.getPublicaciones();
	}

	filter(event) {
		this.textSearch = event.detail.value;
	}

	getUsuario() {
		this.usuarioLogin = JSON.parse(localStorage.getItem('usuario') || '[]');
		this.usuario.foto = this.usuarioLogin.foto;
	}

	getPublicaciones() {
		this.apiService.get('publicaciones').subscribe(
			(response) => {
				if (response) {
					this.publicaciones = response.publicaciones;
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

	async modalPublicaciones() {
		const modal = await this.modalController.create({
			component: ModalPublicacionesComponent,
			initialBreakpoint: 0.5,
			breakpoints: [0, 0.5, 1],
		});
		modal.onDidDismiss().then(() => {
			this.getPublicaciones();
		});
		return await modal.present();
	}

	ionViewWillEnter() {
		this.getUsuario();
		this.getPublicaciones();
	}
}
