import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'responsefilter'
})
export class ResponsefilterPipe implements PipeTransform {


  transform(items: any, searchText: string): any[] {
    
    if(!items) return [];
    if(!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter((x:any)=>x.utterance.toLowerCase().includes(searchText));
    
  }

}
