import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
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
	@Input() idPublicacion: number;
	publicacion = new Publicacion();
	publicaciones: any = [];

	constructor(
		private modalController: ModalController,
		private alertController: AlertController,
		private apiService: ApiService,
		private toastService: ToastService
	) {}

	ngOnInit() {
		this.getPublicacion();
	}

	getPublicacion() {
		this.apiService.getId('publicaciones', this.idPublicacion).subscribe(
			(response) => {
				if (response) {
					this.publicaciones = response.publicaciones;
					this.publicacion.titulo = this.publicaciones[0].titulo;
					this.publicacion.mensaje = this.publicaciones[0].mensaje;
					this.publicacion.foto = this.publicaciones[0].foto;
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

	dismissModal() {
		this.modalController.dismiss({
			dismissed: true,
		});
	}

	updatePublicacion(form) {
		form.value.id = this.idPublicacion;
		this.apiService.update('publicaciones', form.value).subscribe(
			(response) => {
				if (response.estado === true) {
					this.toastService.successToast(response.message);
					this.dismissModal();
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

	async updatePublicacionAlert(form) {
		const alert = await this.alertController.create({
			header: 'Actualizar publicación',
			message: '¿Desea actualizar la publicación?',
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
				},
				{
					text: 'Ok',
					handler: () => {
						this.updatePublicacion(form);
					},
				},
			],
		});
		await alert.present();
	}
}
