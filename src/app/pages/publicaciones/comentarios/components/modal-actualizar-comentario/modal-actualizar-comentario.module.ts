import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { ModalActualizarComentarioComponent } from './modal-actualizar-comentario.component';

@NgModule({
	imports: [CommonModule, IonicModule, FormsModule],
	declarations: [ModalActualizarComentarioComponent],
	exports: [ModalActualizarComentarioComponent],
})
export class ModalActualizarComentarioModule {}
