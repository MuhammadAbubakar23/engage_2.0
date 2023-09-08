import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quickReplySearchFilter'
})
export class QuickReplySearchFilterPipe implements PipeTransform {

  transform(items: any, searchText: string): any[] {
    debugger
    if(!items) return [];
    if(!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter((x:any)=>x.text.toLowerCase().includes(searchText));
    
  }

}
