import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatBotIntentFilter'
})
export class ChatBotIntentFilterPipe implements PipeTransform {

  transform(items: any, searchText: string): any[] {
    
    if(!items) return [];
    if(!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter((x:any)=>x.intent.toLowerCase().includes(searchText));
    
  }

}
