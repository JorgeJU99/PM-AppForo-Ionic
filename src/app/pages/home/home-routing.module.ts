import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
	{
		path: '',
		component: HomePage,
		children: [
			{
				path: 'mi-cuenta',
				loadChildren: () =>
					import('../../pages/mi-cuenta/mi-cuenta.module').then(
						(m) => m.MiCuentaPageModule
					),
			},
			{
				path: 'mis-publicaciones',
				loadChildren: () =>
					import('../../pages/mis-publicaciones/mis-publicaciones.module').then(
						(m) => m.MisPublicacionesPageModule
					),
			},
			{
				path: 'publicaciones',
				loadChildren: () =>
					import('../../pages/publicaciones/publicaciones.module').then(
						(m) => m.PublicacionesPageModule
					),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class HomePageRoutingModule {}
