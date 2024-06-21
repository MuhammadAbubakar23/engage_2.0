import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'quickReplySearchFilter'
})
export class QuickReplySearchFilterPipe implements PipeTransform {
  transform(items: any, searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    // return items.filter((x:any)=>x.text.toLowerCase().includes(searchText));
    return items.filter((item:any) => {
      const mainTextMatches = item?.text.toLowerCase().includes(searchText);
      const childTextMatches = item?.subReply?.some((subItem: any) =>
      subItem.text.toLowerCase().includes(searchText) || 
      (subItem.subReply && subItem.subReply.some((thirdLevelItem: any) =>
        thirdLevelItem.text.toLowerCase().includes(searchText)
      ))
    );
      return mainTextMatches || childTextMatches;
    });
  }
  }
