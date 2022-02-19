import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ActionSheetController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalPublicacionesComponent } from './components/modal-publicaciones/modal-publicaciones.component';

@Component({
	selector: 'app-mis-publicaciones',
	templateUrl: './mis-publicaciones.page.html',
	styleUrls: ['./mis-publicaciones.page.scss'],
})
export class MisPublicacionesPage implements OnInit {
	usuarioLogin: any = [];
	publicaciones: any = [];
	textSearch = '';

	constructor(
		private apiService: ApiService,
		private toastService: ToastService,
		private actionSheetController: ActionSheetController,
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
	}

	getPublicaciones() {
		this.apiService.getId('publicaciones/usuario', this.usuarioLogin.id).subscribe(
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

	deletePublicacion(id) {
		this.apiService.delete('publicaciones', id).subscribe(
			(response) => {
				if (response.estado === true) {
					this.toastService.successToast(response.message);
					this.getPublicaciones();
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

	async publicacionActionSheet(publicacion) {
		const actionSheet = await this.actionSheetController.create({
			header: 'Publicación',
			animated: true,
			backdropDismiss: true,
			keyboardClose: false,
			buttons: [
				{
					text: 'Eliminar',
					role: 'destructive',
					icon: 'trash',
					handler: () => {
						this.deletePublicacion(publicacion.idpublicacion);
					},
				},
				{
					text: 'Editar',
					icon: 'create',
					handler: () => {
						this.modalPublicaciones(publicacion.idpublicacion);
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

	async modalPublicaciones(id) {
		const modal = await this.modalController.create({
			component: ModalPublicacionesComponent,
			initialBreakpoint: 0.5,
			breakpoints: [0, 0.5, 1],
			componentProps: {
				idPublicacion: id,
			},
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
