import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {


  transform(items: any, searchText: string): any[] {
    debugger
    if(!items) return [];
    if(!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter((x:any)=>x.name.toLowerCase().includes(searchText));
    
  }
  
}
