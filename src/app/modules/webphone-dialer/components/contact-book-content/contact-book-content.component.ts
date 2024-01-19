import { Component, Input } from '@angular/core';
import { TabsArr } from '../../shared/interfaces';

@Component({
  selector: 'app-contact-book-content',
  templateUrl: './contact-book-content.component.html',
  styleUrls: ['./contact-book-content.component.scss']
})
export class ContactBookContentComponent {
  @Input() tabsArr:TabsArr = ({} as any) as TabsArr;

}
