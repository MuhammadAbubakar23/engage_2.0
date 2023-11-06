import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, Observable, of, switchMap} from 'rxjs'; 
import { TagsService } from './tags.service';
import { loadTagsList, loadTagsListFail, loadTagsListSuccess, updateTagsList, updateTagsListFail, updateTagsListSuccess } from './tags.actions';
import { TagsModel } from './tags.model';

@Injectable()
export class TagsEffects {
  constructor(
    private action$: Actions,
    private tagsService: TagsService
  ) {}
  //public readonly 
  loadTags$: Observable<any> = createEffect(() => {
    return this.action$.pipe(
      ofType(loadTagsList),
      mergeMap((action) => {
        return this.tagsService.getTeamsList().pipe(
          map((tagss: TagsModel[]) => loadTagsListSuccess({ tagss })),
          catchError((error: string | null) => of(loadTagsListFail({ error })))
          //  catchError(error => of(loadTagsList(),fail({ error })))
          //   return this.actions$.pipe(
          //     ofType(MemberActions.loadMembers),
          //     mergeMap(() => this.memberService.getMembers().pipe(
          //         map(members=> MemberActions.loadMembersSuccess({ members })),
          //         catchError(error => of(MemberActions.loadMembers()Fail({ error })))
          //  )));
        );
      })
    );
  });
  updateTags$: Observable<any> = createEffect(() => {
    return this.action$.pipe(
      ofType(updateTagsList),
      mergeMap((action) => {
        return this.tagsService.getRolesList().pipe(
          map((tagss: TagsModel[]) => updateTagsListSuccess({ tagss })),
          catchError((error: string | null) => of(updateTagsListFail({ error })))
          //  catchError(error => of(loadTagsList(),fail({ error })))
          //   return this.actions$.pipe(
          //     ofType(MemberActions.loadMembers),
          //     mergeMap(() => this.memberService.getMembers().pipe(
          //         map(members=> MemberActions.loadMembersSuccess({ members })),
          //         catchError(error => of(MemberActions.loadMembers()Fail({ error })))
          //  )));
        );
      })
    );
  });
}