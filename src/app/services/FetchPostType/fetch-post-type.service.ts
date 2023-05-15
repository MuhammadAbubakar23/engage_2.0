import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchPostTypeService {

  postType:any;
  constructor() { }

  sendPostType(postType:any){

      
    this.postType = postType;

  }

  getPostType(){
     
    return this.postType;
  }
}
