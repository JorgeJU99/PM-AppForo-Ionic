import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	private refresh = new Subject<void>();
	private url = 'http://localhost:3000/';

	constructor(private http: HttpClient) {}

	get refreshData() {
		return this.refresh;
	}

	get(path: any): Observable<any> {
		return this.http.get<any>(this.url + path).pipe(
			tap(() => {
				this.refresh.next();
			})
		);
	}

	getId(path: any, data: any) {
		return this.http.get<any>(this.url + path + '/' + data);
	}

	save(path: any, data: any) {
		return this.http.post<any>(this.url + path, data).pipe(
			tap(() => {
				this.refresh.next();
			})
		);
	}

	update(path: any, data: any) {
		return this.http.put<any>(this.url + path + '/' + data.id, data);
	}

	delete(path: any, data: any) {
		return this.http.delete<any>(this.url + path + '/' + data);
	}
}
