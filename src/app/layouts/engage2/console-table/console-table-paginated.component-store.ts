import { Injectable } from "@angular/core";
import { ComponentStore, OnStoreInit, tapResponse } from "@ngrx/component-store";
import { Observable, switchMap, tap, withLatestFrom } from "rxjs";

export interface PaginationDetails {
  offset: number;
  pageSize: number;
}

export interface PageContent<TItem> {
  items: TItem[];
}

export interface ConsoleTablePaginatedState<TItem> {
  paginationDetails: PaginationDetails;
  pageContent: PageContent<TItem>;
}

@Injectable()
export abstract class ConsoleTablePaginatedComponentStore<TItem> 
  extends ComponentStore<ConsoleTablePaginatedState<TItem>>
  implements OnStoreInit
{
  ngrxOnStoreInit() {
    this.loadPage();
  }

  readonly selectConsoleTablePaginatedState = this.select((state) => state);

  readonly selectPaginationDetails = this.select( this.selectConsoleTablePaginatedState, ({ paginationDetails }) => paginationDetails);

  readonly selectOffset = this.select( this.selectPaginationDetails, ({ offset }) => offset);

  readonly selectPageSize = this.select( this.selectPaginationDetails, ({ pageSize }) => pageSize);

  readonly selectPageContent = this.select( this.selectConsoleTablePaginatedState, ({ pageContent }) => pageContent);

  readonly selectItems = this.select( this.selectPageContent, ({ items }) => items);

  protected abstract getItems( paginationDetails: PaginationDetails): Observable<TItem[]>;

  readonly loadPage = this.effect((trigger$: Observable<void>) => {
    return trigger$.pipe(
      withLatestFrom(this.selectPaginationDetails),
      switchMap(([, { offset, pageSize }]) =>
        this.getItems({ offset, pageSize }).pipe(
          tapResponse(
            (items: TItem[]) => this.updateConsoleTablePaginated({ items }),
            () => console.error("Something went wrong")
          )
        )
      )
    );
  });

  readonly loadNextPage = this.effect((trigger$: Observable<void>) => {
    return trigger$.pipe(
      withLatestFrom(this.selectPaginationDetails),
      tap(([, { offset, pageSize }]) =>
        this.updatePagination({
          offset: offset + pageSize,
          pageSize,
        })
      ),
      tap(() => this.loadPage())
    );
  });

  private readonly updatePagination = this.updater( (state, paginationDetails: PaginationDetails) => ({ ...state, paginationDetails, }));

  private readonly updateConsoleTablePaginated = this.updater((state, pageContent: PageContent<TItem>) => ({ ...state, pageContent }));
}