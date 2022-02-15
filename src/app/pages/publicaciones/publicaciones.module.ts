import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicacionesPageRoutingModule } from './publicaciones-routing.module';

import { PublicacionesPage } from './publicaciones.page';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module';
import { ToolbarSearchModule } from 'src/app/components/toolbar-search/toolbar-search.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		PublicacionesPageRoutingModule,
		ToolbarModule,
		ToolbarSearchModule,
	],
	declarations: [PublicacionesPage],
})
export class PublicacionesPageModule {}
