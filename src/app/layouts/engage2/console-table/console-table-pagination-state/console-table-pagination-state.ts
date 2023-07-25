export interface ConsoleTablePaginationState {
    pageIndex: number;
    pageSize: number;
    length: number;
    pageSizeOptions: ReadonlySet<number>;
    //searchText?:string;
  }