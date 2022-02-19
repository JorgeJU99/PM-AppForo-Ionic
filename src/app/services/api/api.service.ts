import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	private url = 'http://localhost:3000/';

	constructor(private http: HttpClient) {}

	get(path: any) {
		return this.http.get<any>(this.url + path);
	}

	getId(path: any, data: any) {
		return this.http.get<any>(this.url + path + '/' + data);
	}

	save(path: any, data: any) {
		return this.http.post<any>(this.url + path, data);
	}

	update(path: any, data: any) {
		return this.http.put<any>(this.url + path + '/' + data.id, data);
	}

	delete(path: any, data: any) {
		return this.http.delete<any>(this.url + path + '/' + data);
	}
}
