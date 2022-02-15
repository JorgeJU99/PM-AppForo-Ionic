import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarDatosPageRoutingModule } from './actualizar-datos-routing.module';

import { ActualizarDatosPage } from './actualizar-datos.page';
import { ToolbarRouterModule } from 'src/app/components/toolbar-router/toolbar-router.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ActualizarDatosPageRoutingModule,
		ToolbarRouterModule,
	],
	declarations: [ActualizarDatosPage],
})
export class ActualizarDatosPageModule {}
