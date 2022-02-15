import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-toolbar-search',
	templateUrl: './toolbar-search.component.html',
})
export class ToolbarSearchComponent implements OnInit {
	@Input() filterSearch: string;

	constructor(private router: Router) {}

	ngOnInit() {}

	search(dato) {
		if (this.filterSearch === 'publicaciones') {
			this.router.navigate(['app/home/publicaciones/', dato]);
		}
		if (this.filterSearch === 'mis-publicaciones') {
			this.router.navigate(['app/home/mis-publicaciones/', dato]);
		}
	}
}
