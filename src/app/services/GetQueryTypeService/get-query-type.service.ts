import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetQueryTypeService {

  queryType:any;
  constructor() { }

  sendQueryType(queryType:any){
    this.queryType = queryType;
  }

  getQueryType(){
    return this.queryType;
  }
}
