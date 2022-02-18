import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { ModalRegistrarComentarioComponent } from './modal-registrar-comentario.component';

@NgModule({
	imports: [CommonModule, IonicModule, FormsModule],
	declarations: [ModalRegistrarComentarioComponent],
	exports: [ModalRegistrarComentarioComponent],
})
export class ModalRegistrarComentarioModule {}
