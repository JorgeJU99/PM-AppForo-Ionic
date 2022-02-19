import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, ModalController, AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ModalRegistrarComentarioComponent } from './components/modal-registrar-comentario/modal-registrar-comentario.component';
import { ModalActualizarComentarioComponent } from './components/modal-actualizar-comentario/modal-actualizar-comentario.component';

@Component({
	selector: 'app-comentarios',
	templateUrl: './comentarios.page.html',
	styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {
	usuario: any = [];
	publicacion: any = [];
	comentarios: any = [];
	comentario: any = [];

	constructor(
		private activatedRoute: ActivatedRoute,
		private actionSheetController: ActionSheetController,
		private modalController: ModalController,
		private alertController: AlertController,
		private apiService: ApiService,
		private toastService: ToastService
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

	async modalComentarioCreate(id) {
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

	async modalComentarioUpdate(id) {
		const modal = await this.modalController.create({
			component: ModalActualizarComentarioComponent,
			initialBreakpoint: 0.5,
			breakpoints: [0, 0.5, 1],
			componentProps: {
				idUsuario: this.usuario.id,
				idComentario: id,
			},
		});
		modal.onDidDismiss().then(() => {
			this.getPublicacion();
		});
		return await modal.present();
	}

	deleteComentario(id) {
		this.apiService.delete('comentarios', id).subscribe(
			(response) => {
				if (response.estado === true) {
					this.toastService.successToast(response.message);
					this.getPublicacion();
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

	async deleteComentarioAlert(id) {
		const alert = await this.alertController.create({
			header: 'Eliminar comentario',
			message: '¿Desea eliminar el comentario?',
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
				},
				{
					text: 'Ok',
					handler: () => {
						this.deleteComentario(id);
					},
				},
			],
		});
		await alert.present();
	}

	async comentarioActionSheet(comentario) {
		const actionSheet = await this.actionSheetController.create({
			header: 'Comentario',
			animated: true,
			backdropDismiss: true,
			keyboardClose: false,
			buttons: [
				{
					text: 'Eliminar',
					role: 'destructive',
					icon: 'trash',
					handler: () => {
						this.deleteComentarioAlert(comentario.idcomentario);
					},
				},
				{
					text: 'Editar',
					icon: 'create',
					handler: () => {
						this.modalComentarioUpdate(comentario.idcomentario);
					},
				},
				{
					text: 'Cancelar',
					icon: 'arrow-undo',
					role: 'cancel',
				},
			],
		});
		await actionSheet.present();
	}
}
