import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TreeGenService<T> {
  constructor() { }
  buildTree<T>(elements:any, parentId:number, subIndex:string="subMenu", mainId:string="mainId"): any {
    let _self = this;
    let branch:T[] = [];
    let children:T[];
    let parents:any = elements.filter(function(element:any) {
      return element.parentId == parentId;
    });
    if (Object.keys(parents)?.length > 0) {
      parents.forEach(function(item:any, index:number) {
        children = _self.buildTree(elements, item[mainId], subIndex);
        if (Object.keys(children)?.length > 0) item[subIndex] = children;
        branch.push(item);
      });
    } else {
      branch = parents;
    }
    return branch;
  }
}
