import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
	selector: 'app-modal-actualizar-comentario',
	templateUrl: './modal-actualizar-comentario.component.html',
	styleUrls: ['./modal-actualizar-comentario.component.scss'],
})
export class ModalActualizarComentarioComponent implements OnInit {
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
}
