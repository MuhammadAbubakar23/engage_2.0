import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceLineBreaks'
})
export class BreaklinePipe implements PipeTransform {

  transform(value: string,): any {
    
 const breakvalue= value.replace(/<[^>]*>/g, '');
 return breakvalue.slice(0,150)
  }

}
