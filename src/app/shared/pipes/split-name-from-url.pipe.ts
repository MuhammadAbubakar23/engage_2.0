import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitNameFromUrl'
})
export class SplitNameFromUrlPipe implements PipeTransform {

  transform(value: string): string {
    const parts = value.split('/').map(part => part.split('.')[0]);
    return parts[4];
  }

}
