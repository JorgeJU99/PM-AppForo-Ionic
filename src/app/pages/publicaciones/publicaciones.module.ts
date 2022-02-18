import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicacionesPageRoutingModule } from './publicaciones-routing.module';

import { PublicacionesPage } from './publicaciones.page';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module';
import { ToolbarSearchModule } from 'src/app/components/toolbar-search/toolbar-search.module';
import { ModalPublicacionesModule } from './components/modal-publicaciones/modal-publicaciones.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		PublicacionesPageRoutingModule,
		ToolbarModule,
		ToolbarSearchModule,
		ModalPublicacionesModule,
	],
	declarations: [PublicacionesPage],
})
export class PublicacionesPageModule {}
