import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'consoleTableVisibility'
})
export class ConsoleTableVisibilityPipe implements PipeTransform {

  transform(values: any[], ...args: unknown[]): any | null | unknown {
    return values.filter(v => v.visible == true);
  }

}
