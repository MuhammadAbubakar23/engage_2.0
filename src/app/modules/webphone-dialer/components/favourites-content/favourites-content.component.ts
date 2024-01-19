import { Component, Input } from '@angular/core';
import { TabsArr } from '../../shared/interfaces';

@Component({
  selector: 'app-favourites-content',
  templateUrl: './favourites-content.component.html',
  styleUrls: ['./favourites-content.component.scss']
})
export class FavouritesContentComponent {
  @Input() tabsArr:TabsArr = ({} as any) as TabsArr;

}
