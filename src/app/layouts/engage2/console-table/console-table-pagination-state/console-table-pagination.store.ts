import { Injectable } from '@angular/core';
import { ComponentStore, OnStateInit } from '@ngrx/component-store';
import { filter, tap, map, withLatestFrom, pairwise, skip } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ConsoleTablePaginationState } from './console-table-pagination-state';
import { ConsoleTablePaginationEvent } from './console-table-pagination-event';


@Injectable()
export class ConsoleTablePaginationStore extends ComponentStore<ConsoleTablePaginationState> implements OnStateInit {

  ngrxOnStateInit() {
    // called once after state has been first initialized
  }
  constructor() {
    // set defaults
    super({
      pageIndex: 0,
      pageSize: 50,
      length: 0,
      pageSizeOptions: new Set<number>([50]),
      //searchText:''
    });
  }
  // *********** Updaters *********** //

  readonly setPageIndex = this.updater((state, value: string | number) => ({
    ...state,
    pageIndex: Number(value) || 0,
  }));

  readonly setPageSize = this.updater((state, value: string | number) => ({
    ...state,
    pageSize: Number(value) || 0,
  }));

  readonly setLength = this.updater((state, value: string | number) => ({
    ...state,
    length: Number(value) || 0,
  }));

  readonly setPageSizeOptions = this.updater(
    (state, value: readonly number[]) => {
      // Making sure that the pageSize is included and sorted
      const pageSizeOptions = new Set<number>(
        [...value, state.pageSize].sort((a, b) => a - b)
      );
      return { ...state, pageSizeOptions };
    }
  );

  readonly changePageSize = this.updater((state, newPageSize: number) => {
    const startIndex = state.pageIndex * state.pageSize;
    return {
      ...state,
      pageSize: newPageSize,
      pageIndex: Math.floor(startIndex / newPageSize),
    };
  });

  // readonly serachPageText = this.updater((state, newSearchText: string) => {
  //   return {
  //     ...state,
  //     searchText: newSearchText,
  //   };
  // });

  // *********** Selectors *********** //

  readonly hasPreviousPage$ = this.select(
    ({ pageIndex, pageSize }) => pageIndex >= 1 && pageSize != 0
  );

  readonly numberOfPages$ = this.select(({ pageSize, length }) => {
    if (!pageSize) return 0;
    return Math.ceil(length / pageSize);
  });

  readonly hasNextPage$ = this.select(this.state$, this.numberOfPages$, ({ pageIndex, pageSize }, numberOfPages) => {
    const maxPageIndex = numberOfPages - 1;
    return pageIndex < maxPageIndex && pageSize != 0;
  }
  );

  readonly rangeLabel$ = this.select(({ pageIndex, pageSize, length }) => {
    if (length === 0 || pageSize === 0) return `0 of ${length}`;

    length = Math.max(length, 0);
    const startIndex = pageIndex * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;

    return `${startIndex + 1} – ${endIndex} of ${length}`;
  });

  // ViewModel of Paginator component
  readonly vm$ = this.select(
    this.state$,
    this.hasPreviousPage$,
    this.hasNextPage$,
    this.rangeLabel$,
    (state, hasPreviousPage, hasNextPage, rangeLabel) => ({
      pageSize: state.pageSize,
      pageSizeOptions: Array.from(state.pageSizeOptions),
      pageIndex: state.pageIndex,
      // searchText: state.searchText,
      hasPreviousPage,
      hasNextPage,
      rangeLabel,
    })
  );

  private readonly pageIndexChanges$ = this.state$.pipe(
    // map instead of select, so that non-distinct value could go through
    map((state) => state.pageIndex),
    pairwise()
  );

  readonly page$: Observable<ConsoleTablePaginationEvent> = this.select(
    // first Observable 👇
    this.pageIndexChanges$,
    // second Observable 👇
    this.select((state) => [state.pageSize, state.length]),//, state.searchText
    // Now combining the results from both of these Observables into a PageEvent object
    ([previousPageIndex, pageIndex], [pageSize, length]) => ({//, searchText
      pageIndex,
      previousPageIndex,
      pageSize,
      length,
    }),
    // debounce, so that we let the state "settle"
    { debounce: true }
  ).pipe(
    // Skip the emission of the initial state values
    skip(1)
  );

  readonly nextPage = this.effect((trigger$) => {
    return trigger$.pipe(
      withLatestFrom(this.hasNextPage$),
      filter(([, hasNextPage]) => hasNextPage),
      tap(() => {
        this.setPageIndex(this.get().pageIndex + 1);
      })
    );
  });

  readonly firstPage = this.effect((trigger$) => {
    return trigger$.pipe(
      withLatestFrom(this.hasPreviousPage$),
      filter(([, hasPreviousPage]) => hasPreviousPage),
      tap(() => {
        this.setPageIndex(0);
      })
    );
  });

  readonly previousPage = this.effect((trigger$) => {
    return trigger$.pipe(
      withLatestFrom(this.hasPreviousPage$),
      filter(([, hasPreviousPage]) => hasPreviousPage),
      tap(() => {
        this.setPageIndex(this.get().pageIndex - 1);
      })
    );
  });

  readonly lastPage = this.effect((trigger$) => {
    return trigger$.pipe(
      withLatestFrom(this.hasNextPage$, this.numberOfPages$),
      filter(([, hasNextPage]) => hasNextPage),
      tap(([, , numberOfPages]) => {
        this.setPageIndex(numberOfPages - 1);
      })
    );
  });
}
