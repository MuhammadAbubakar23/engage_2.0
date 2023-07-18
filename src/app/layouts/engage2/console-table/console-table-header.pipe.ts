import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'consoleTableHeader'
})
export class ConsoleTableHeaderPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
