import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MenuModel } from 'src/app/layouts/engage2/menu-state/menu.model';
import { ToasterService } from 'src/app/layouts/engage2/toaster/toaster.service';
import { RequestService } from 'src/app/shared/services/request/request.service';
@Injectable({
  providedIn: 'root'
})
export class ConsoleService {
  constructor(private request:RequestService, private toaster:ToasterService) { }
  channels():Observable<MenuModel[]>{
    //this.showErrorToaster();
    return this.request.get<MenuModel[]>("channels", {}).pipe(
      map((response: MenuModel[]) => {
        // if(response.length>=1) this.stor.store(storekey, response);
        // else this.stor.delete(storekey); 
        return response;  
      })
    );
  }
  showSuccessToaster() {
    this.toaster.show('success', 'Well done!', 'This is a success alert');
  }
  showErrorToaster() {
    this.toaster.show('error', 'Check it out!', 'This is a error alert');
  }
  showWarningToaster() {
    this.toaster.show('warning', 'Check it out!', 'This is a warning alert', 3000);
  }
}
