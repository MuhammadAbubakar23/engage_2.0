import { ConsoleTablePaginationState } from "./console-table-pagination-state";

export interface ConsoleTablePaginationEvent extends Pick<ConsoleTablePaginationState, 'pageIndex' | 'pageSize' | 'length' > {
  previousPageIndex?: number;
  //searchText?: string;
}