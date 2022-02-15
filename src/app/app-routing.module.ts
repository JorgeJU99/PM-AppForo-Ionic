import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
	{
		path: 'login',
		loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginPageModule),
	},
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full',
	},
	{
		path: 'app',
		canActivate: [AuthGuard],
		children: [
			{
				path: 'home',
				loadChildren: () =>
					import('./pages/home/home.module').then((m) => m.HomePageModule),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
