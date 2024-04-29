import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BotMonitoringService } from '../../services/bot-monitoring.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule],
})
export class ComponentsComponent implements OnInit {
  newPhrase: string = '';

  items = [
    { name: 'greet', progress: 40, label: '0', strokeDasharray: '126.92', strokeDashoffset: '76.66px', strokeColor: '#fff', active: true },
    { name: 'Hello', progress: 40, label: '6', strokeDasharray: '126.92', strokeDashoffset: '76.66px', strokeColor: '#333', active: false },
    { name: 'Goodbye', progress: 40, label: '10', strokeDasharray: '126.92', strokeDashoffset: '76.66px', strokeColor: '#333', active: false }
  ];
  generatedPhrases: any[] = [];
  phrase = [
    { id: 1, label: 'Hey' },
    { id: 2, label: 'Hello' },
    { id: 3, label: 'Byee' },
    { id: 4, label: 'Good Morning' },
    { id: 5, label: 'Good Afternoon' }
  ];
  constructor(private _botService: BotMonitoringService) { }

  ngOnInit(): void {
  }
  generateAugments() {
    const obj = new FormData();
    obj.append('intent', this.newPhrase);
    obj.append('bot_id', "4");

    this._botService.GenerateAugment(obj).subscribe((res: any) => {
      console.log(res);
      this.generatedPhrases = res;
      this.newPhrase = '';
    });
  }

}
