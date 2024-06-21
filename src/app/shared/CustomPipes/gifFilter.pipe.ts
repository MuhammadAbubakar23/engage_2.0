import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'gifFilter'
})
export class GifFilterPipe implements PipeTransform {
  transform(items: any, searchGif: string): any[] {
    if(!items) return [];
    if(!searchGif) return items;
    searchGif = searchGif.toLowerCase();
    return items.filter((x:any)=>x.name.toLowerCase().includes(searchGif));
  }
}
