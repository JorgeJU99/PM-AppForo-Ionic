import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicacionesPageRoutingModule } from './publicaciones-routing.module';

import { PublicacionesPage } from './publicaciones.page';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module';
import { ModalPublicacionesModule } from './components/modal-publicaciones/modal-publicaciones.module';

import { FiltroModule } from 'src/app/pipes/filtro/filtro.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		PublicacionesPageRoutingModule,
		ToolbarModule,
		ModalPublicacionesModule,
		FiltroModule,
	],
	declarations: [PublicacionesPage],
})
export class PublicacionesPageModule {}
