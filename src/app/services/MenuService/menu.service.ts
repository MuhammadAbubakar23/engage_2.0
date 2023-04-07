import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  // getMenu(){
  //   return this.http.get("https://localhost:44383/api/Menu/MenuItems");
  // }
}
