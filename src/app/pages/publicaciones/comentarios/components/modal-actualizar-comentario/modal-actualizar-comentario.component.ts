import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';

export class Comentario {
	public comentario: string;
}

@Component({
	selector: 'app-modal-actualizar-comentario',
	templateUrl: './modal-actualizar-comentario.component.html',
	styleUrls: ['./modal-actualizar-comentario.component.scss'],
})
export class ModalActualizarComentarioComponent implements OnInit {
	@Input() idUsuario: number;
	@Input() idComentario: number;
	comentarios = new Comentario();
	comentario: any = [];

	constructor(
		private modalController: ModalController,
		private alertController: AlertController,
		private apiService: ApiService,
		private toastService: ToastService
	) {}

	ngOnInit() {
		this.getComentario();
	}

	dismissModal() {
		this.modalController.dismiss({
			dismissed: true,
		});
	}

	getComentario() {
		this.apiService.getId('comentarios', this.idComentario).subscribe(
			(response) => {
				if (response) {
					this.comentario = response.comentarios;
					this.comentarios.comentario = this.comentario[0].comentario;
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

	updateComentario(form) {
		form.value.id = this.idComentario;
		form.value.idUsuario = this.idUsuario;
		this.apiService.update('comentarios', form.value).subscribe(
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

	async updateComentarioAlert(form) {
		const alert = await this.alertController.create({
			header: 'Actualizar comentario',
			message: '¿Desea actualizar el comentario?',
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
				},
				{
					text: 'Ok',
					handler: () => {
						this.updateComentario(form);
					},
				},
			],
		});
		await alert.present();
	}
}
