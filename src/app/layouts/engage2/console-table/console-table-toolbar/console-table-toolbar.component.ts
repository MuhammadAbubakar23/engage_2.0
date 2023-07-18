import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
// import { provideComponentStore } from '@ngrx/component-store';
// import { ConsoleTableComponentStore } from '../console-table.component-store';

@Component({
  selector: 'console-table-toolbar',
  templateUrl: './console-table-toolbar.component.html',
  styleUrls: ['./console-table-toolbar.component.scss'],
  // providers: [provideComponentStore(ConsoleTableComponentStore)],
})
export class ConsoleTableToolbarComponent<T> {
  @Output("onPrevious") onPrevious: EventEmitter<any> = new EventEmitter();
  @Output("onNext") onNext: EventEmitter<any> = new EventEmitter();
  // private readonly _componentStore = inject(ConsoleTableComponentStore<T>);
  // readonly vm$ = this._componentStore.vm$;
  onPreviousPage(): void {
    this.onPrevious.emit();
  }

  onNextPage(): void {
    this.onNext.emit();
  }

}
