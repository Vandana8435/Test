import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  getData():Observable<any>{
    return this.http.get<any>(`https://run.mocky.io/v3/fd240986-dc37-4bcb-be85-ed0cb6467bb7`);
  }
}
