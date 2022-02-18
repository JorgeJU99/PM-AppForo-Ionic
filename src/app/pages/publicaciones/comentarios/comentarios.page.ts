import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ModalController } from '@ionic/angular';
import { ModalRegistrarComentarioComponent } from './components/modal-registrar-comentario/modal-registrar-comentario.component';

@Component({
	selector: 'app-comentarios',
	templateUrl: './comentarios.page.html',
	styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {
	usuario: any = [];
	publicacion: any = [];
	comentarios: any = [];

	constructor(
		private activatedRoute: ActivatedRoute,
		private apiService: ApiService,
		private toastService: ToastService,
		private modalController: ModalController
	) {}

	ngOnInit() {
		this.getUsuario();
		this.getPublicacion();
	}

	getUsuario() {
		this.usuario = JSON.parse(localStorage.getItem('usuario') || '[]');
	}

	getPublicacion() {
		this.activatedRoute.paramMap.subscribe((paramMap) => {
			const id = paramMap.get('id');
			this.apiService.getId('publicaciones/comentario', id).subscribe(
				(response) => {
					if (response) {
						this.publicacion = response.publicaciones;
						this.getComentarios(id);
					}
					if (response.estado === false) {
						this.toastService.errorToast(response.message);
					}
				},
				(error) => {
					this.toastService.errorToast(error.error.message);
				}
			);
		});
	}

	getComentarios(id) {
		this.apiService.getId('comentarios/publicacion', id).subscribe(
			(response) => {
				if (response) {
					this.comentarios = response.comentarios;
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

	async modalComentario(id) {
		const modal = await this.modalController.create({
			component: ModalRegistrarComentarioComponent,
			initialBreakpoint: 0.5,
			breakpoints: [0, 0.5, 1],
			componentProps: {
				idUsuario: this.usuario.id,
				idPublicacion: id,
			},
		});
		modal.onDidDismiss().then(() => {
			this.getPublicacion();
		});
		return await modal.present();
	}
}
