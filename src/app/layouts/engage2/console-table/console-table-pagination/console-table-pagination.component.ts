import { Component, OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  ViewEncapsulation,
  EventEmitter,
} from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';
import { ConsoleTablePaginationStore } from './console-table-pagination.store';

@Component({
  selector: 'console-table-pagination',
  templateUrl: './console-table-pagination.component.html',
  styleUrls: ['./console-table-pagination.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(ConsoleTablePaginationStore)],
})
export class ConsoleTablePaginationComponent implements OnInit {

  ngOnInit(): void {
  }
  @Input() set pageIndex(value: string | number) {
    this.paginatorStore.setPageIndex(value);
  }

  @Input() set length(value: string | number) {
    this.paginatorStore.setLength(value);
  }

  @Input() set pageSize(value: string | number) {
    this.paginatorStore.setPageSize(value);
  }

  @Input() set pageSizeOptions(value: readonly number[]) {
    this.paginatorStore.setPageSizeOptions(value);
  }

  //@Output() readonly search = this.paginatorStore.search$;
  @Output() searchPageEvent = new EventEmitter<string>();
  // Outputing the event directly from the page$ Observable<PageEvent> property.
  /** Event emitted when the paginator changes the page size or page index. */
  @Output() readonly page = this.paginatorStore.page$;

  // ViewModel for the PaginatorComponent
  readonly vm$ = this.paginatorStore.vm$;

  constructor(private readonly paginatorStore: ConsoleTablePaginationStore) {
    // this.paginatorStore.setState(initialState);
  }
  serachPage(newsearch:any){
    this.searchPageEvent.emit(newsearch);
  }
  changePageSize(newPageSize: number) {
    this.paginatorStore.changePageSize(newPageSize);
  }
  nextPage() {
    this.paginatorStore.nextPage();
  }
  firstPage() {
    this.paginatorStore.firstPage();
  }
  previousPage() {
    this.paginatorStore.previousPage();
  }
  lastPage() {
    this.paginatorStore.lastPage();
  }
}
