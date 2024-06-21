import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'groupbydate'
})
export class GroupbydatePipe implements PipeTransform {
  transform(collection: Array<any>, property: string = 'createdDate'): Array<any> {
    if(!collection) {
        // return null;
    }
    const gc = collection.reduce((previous, current)=> {
        if(!previous[current[property]]) {
            previous[current[property]] = [];
        }
            current.events.forEach((x:any) => previous[current[property]].push(x));
        return previous;
    }, {});
    return Object.keys(gc).map(date => ({ date: date, events: gc[date] }));
}
}
