import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'getFileTypeFromUrl'
})
export class GetFileTypeFromUrlPipe implements PipeTransform {
  transform(value: string): string {
    const parts = value.split('.');
    const lastIndexItem = parts.length - 1
    return parts[lastIndexItem];
  }
}
