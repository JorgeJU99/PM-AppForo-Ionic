import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { ModalPublicacionesComponent } from './modal-publicaciones.component';

@NgModule({
	imports: [CommonModule, IonicModule, FormsModule],
	declarations: [ModalPublicacionesComponent],
	exports: [ModalPublicacionesComponent],
})
export class ModalPublicacionesModule {}
