import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComentariosPageRoutingModule } from './comentarios-routing.module';

import { ComentariosPage } from './comentarios.page';
import { ToolbarRouterModule } from 'src/app/components/toolbar-router/toolbar-router.module';
import { ModalRegistrarComentarioModule } from './components/modal-registrar-comentario/modal-registrar-comentario.module';
import { ModalActualizarComentarioModule } from './components/modal-actualizar-comentario/modal-actualizar-comentario.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ComentariosPageRoutingModule,
		ToolbarRouterModule,
		ModalRegistrarComentarioModule,
		ModalActualizarComentarioModule,
	],
	declarations: [ComentariosPage],
})
export class ComentariosPageModule {}
