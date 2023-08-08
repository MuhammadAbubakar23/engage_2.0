import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  ConsoleTablePaginatedComponentStore,
  ConsoleTablePaginatedState,
  PageContent,
  PaginationDetails
} from "./console-table-paginated.component-store";
import { ConsoleTableService } from "./console-table.service";
// import { TodoItem } from "./todo-item";
// import { TodoItemService } from "./todo-item.service";

// export class ConsoleTablePaginatedClass<T> implements ConsoleTablePaginatedState<T>{
//     paginationDetails!: {
//         offset: 0;
//         pageSize: 10;
//     };,
//     pageContent!: {
//         items: [];
//     },

    
// }
const initialState: ConsoleTablePaginatedState<any> = {
  paginationDetails: {
    offset: 0,
    pageSize: 10,
  },
  pageContent: {
    items: [],
  },
};

@Injectable()
export class ConsoleTableComponentStore<T> extends ConsoleTablePaginatedComponentStore<T> {
  readonly vm$ = this.select(this.selectItems, (items) => ({ items }));
//   readonly initialState$: ConsoleTablePaginatedState<T> = {
//     paginationDetails: {
//       offset: 0,
//       pageSize: 10,
//     },
//     pageContent: {
//       items: [],
//     },
//   };
  constructor() {
    super(initialState);
  }

  private readonly _consoleTableService = inject(ConsoleTableService);

  protected override getItems({ offset, pageSize }: PaginationDetails): Observable<T[]> {
    return this._consoleTableService.getItems(offset, pageSize);
  }
}