import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';

export class Publicacion {
	public idUsuario: number;
	public titulo: string;
	public mensaje: string;
	public fecha: Date;
	public foto: string;
}

@Component({
	selector: 'app-modal-publicaciones',
	templateUrl: './modal-publicaciones.component.html',
	styleUrls: ['./modal-publicaciones.component.scss'],
})
export class ModalPublicacionesComponent implements OnInit {
	publicacion = new Publicacion();
	usuarioLogin: any = [];

	constructor(
		private modalController: ModalController,
		private apiService: ApiService,
		private toastService: ToastService
	) {}

	ngOnInit() {
		this.getUsuario();
	}

	getUsuario() {
		this.usuarioLogin = JSON.parse(localStorage.getItem('usuario') || '[]');
	}

	dismissModal() {
		this.modalController.dismiss({
			dismissed: true,
		});
	}

	registerPublicacion(form) {
		form.value.idUsuario = this.usuarioLogin.id;
		this.apiService.save('publicaciones', form.value).subscribe(
			(response) => {
				if (response.estado === true) {
					this.toastService.successToast(response.message);
					this.dismissModal();
					this.resetForm();
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

	resetForm() {
		this.publicacion.titulo = '';
		this.publicacion.foto = '';
		this.publicacion.mensaje = '';
	}
}
