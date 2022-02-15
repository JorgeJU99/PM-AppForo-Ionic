import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-toolbar-router',
	templateUrl: './toolbar-router.component.html',
	styleUrls: ['./toolbar-router.component.scss'],
})
export class ToolbarRouterComponent implements OnInit {
	@Input() titulo: string;
	@Input() route: string;

	constructor(private router: Router) {}

	ngOnInit() {}

	navigate() {
		this.router.navigate([this.route]);
	}
}
