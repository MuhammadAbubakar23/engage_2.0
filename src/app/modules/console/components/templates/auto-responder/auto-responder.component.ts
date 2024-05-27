import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'app-auto-responder',
  templateUrl: './auto-responder.component.html',
  styleUrls: ['./auto-responder.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class AutoResponderComponent implements OnInit {
  templates = [
    { name: 'Auto Respond', subject: 'RE: [subject_line]', status: false },
    { name: 'Followup Alert Template', subject: 'Followup Alert', status: true },
    { name: 'Greeting', subject: 'RE: [subject_line]', status: true },
    { name: 'Jazzcash Auto Respond Generic', subject: '{EmiSubject}-{TrackingNumber}', status: true }
  ];
  constructor(private headerService: HeaderService, private commonData: CommonDataService) { }

  ngOnInit(): void {
    this.GetFbList()
  }
  updatevalue(string: any) {
    this.headerService.updateMessage(string);
  }

  GetFbList() {
    const nativeIdentifier = '';
    this.commonData.getAutoRespondFB(nativeIdentifier).subscribe((res: any) => {
      console.log("data fb ", res)
      this.templates = res
    })
  }
}
