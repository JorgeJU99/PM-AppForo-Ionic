import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';

export class Comentario {
	public comentario: string;
}

@Component({
	selector: 'app-modal-registrar-comentario',
	templateUrl: './modal-registrar-comentario.component.html',
	styleUrls: ['./modal-registrar-comentario.component.scss'],
})
export class ModalRegistrarComentarioComponent implements OnInit {
	@Input() idUsuario: number;
	@Input() idPublicacion: number;
	comentarios = new Comentario();

	constructor(
		private modalController: ModalController,
		private apiService: ApiService,
		private toastService: ToastService
	) {}

	ngOnInit() {}

	dismissModal() {
		this.modalController.dismiss({
			dismissed: true,
		});
	}

	registerComentario(form) {
		form.value.idUsuario = this.idUsuario;
		form.value.idPublicacion = this.idPublicacion;
		this.apiService.save('comentarios', form.value).subscribe(
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
		this.comentarios.comentario = '';
	}
}
