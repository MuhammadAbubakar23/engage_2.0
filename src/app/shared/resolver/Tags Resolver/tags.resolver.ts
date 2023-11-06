import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map, tap } from 'lodash';
import { Observable, of } from 'rxjs';
import { CommonDataService } from '../../services/common/common-data.service';
import { StorageService } from '../../services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})

export class TagsResolver implements Resolve<any> {
  constructor(private commonService: CommonDataService, private stor: StorageService){}
  resolve(): Promise<any> {
    
    // return this.commonService.GetAllTags()
    return new Promise((resolve, reject)=>{
      this.commonService.GetAllTags().subscribe((res:any)=>{
        this.stor.store('Tags', res);
        resolve(res);
      },
      (error)=>{
        reject(error);
      })
    })
  }
  saveData(data: Observable<any>) {
    throw new Error('Method not implemented.');
  }
}
