import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/shared/services/request/request.service';

@Injectable({
  providedIn: 'root'
})
export class ConsoleTableService {

  constructor(private reqser:RequestService) { }

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
