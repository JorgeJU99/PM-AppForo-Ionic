import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisPublicacionesPageRoutingModule } from './mis-publicaciones-routing.module';

import { MisPublicacionesPage } from './mis-publicaciones.page';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module';
import { ToolbarSearchModule } from 'src/app/components/toolbar-search/toolbar-search.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		MisPublicacionesPageRoutingModule,
		ToolbarModule,
		ToolbarSearchModule,
	],
	declarations: [MisPublicacionesPage],
})
export class MisPublicacionesPageModule {}
