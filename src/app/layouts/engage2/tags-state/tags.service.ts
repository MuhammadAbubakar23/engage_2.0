
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { RequestService } from 'src/app/shared/services/request/request.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { TagsModel } from './tags.model';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(
    private reqs: RequestService,
    private storage: StorageService
  ) {}
  getList(type: string): Observable<TagsModel[]> {
    let tagss: TagsModel[] = [];
    tagss = this.storage.retrive(type, 'O').local;
    if (tagss != null && tagss.length >= 1) return of(tagss);
    else
      return this.reqs
        .post<TagsModel[]>(type, { Emerging: 'tags', Inline: false })
        .pipe(
          map((response: TagsModel[]) => {
            if (response.length >= 1) this.storage.store(type, response);
            else this.storage.delete(type);
            return response;
          })
        );
  }
  getRolesList(): Observable<TagsModel[]> {
    return this.getList('accessrole');
  }
  getTeamsList(): Observable<TagsModel[]> {
    return this.getList('accessteam');
  }
}
