import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/api/auth.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(): boolean {
		if (this.authService.loggedIn()) {
			return true;
		}
		this.router.navigate(['/login']);
		return false;
	}
}
