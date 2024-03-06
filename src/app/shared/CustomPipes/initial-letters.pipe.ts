import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initialLetters'
})
export class InitialLettersPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }


    const words = value.split(' ');


    const initials = words.map(word => word.charAt(0)).join('');

    return initials.toUpperCase(); 
  }
}
