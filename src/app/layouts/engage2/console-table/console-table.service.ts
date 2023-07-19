import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RequestService } from 'src/app/shared/services/request/request.service';

@Injectable({
  providedIn: 'root'
})
export class ConsoleTableService {

  constructor(private api:RequestService) { }
  //private readonly _http = inject(HttpClient);

  getItems<T>(offset?: number, pageSize?: number): Observable<T[]> {
    const params = new HttpParams({
      fromObject: {
        _start: offset ?? 0,
        _limit: pageSize ?? 10,
      },
    });
    return of([]);
    // return this._http.get<T[]>(
    //   "https://jsonplaceholder.typicode.com/todos",
    //   { params }
    // );
  }
  GetAll(url:string, filter:any){


    // let menus : UserModel[] = [];
    //let submenus : MenuModel[] = [];
    //alert("We need processor");
    // menus = this.stor.retrive("menu", 'O').local;
    // if(menus != null && menus.length>=1) 
    //   return of(menus);
    // else
      // return this.reqser.get<UserModel[]>('access', {"Emerging":"menu", "Inline":false}).pipe(
      //   map((response: any) => {
      //     if(response.length>=1) this.stor.store("menu", response);
      //     else this.stor.delete("menu");
      //     return response;  
      //   })
      // );
  }
}
