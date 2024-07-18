import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  standalone:true,
  selector: 'app-access-report',
  templateUrl: './access-report.component.html',
  styleUrls: ['./access-report.component.scss'],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule,NgxSpinnerModule],
})
export class AccessReportComponent implements OnInit {
  tabs:any[] = []; 
  reports:any[] = []; 
  initialTeams: any[] = [];
  teamsList: any[]=[];
  teamId:any = 0;
  showTabs: any;
  selectedTab = this.tabs[0];
  teamSlug: any;
  teamSlugObj: any = {companyId:0,teamSlug:'',actorId:0};
  finalmodal: any = {
    id: 0,
    reportId: 0,
    actorId: 0,
    companyId: 0,
    teamSlug: '',
    isActive: false,
  };

  constructor(private headerService: HeaderService, private commonService: CommonDataService, private router: Router , private spinnerServerice: NgxSpinnerService) { }

  ngOnInit(): void {
    //this.getCompanyTeams();
    this.getActors();

    // this.tabs = [
    //   { id: '1', title: 'Agent', content: 'Agent Content', reports:[] },
    //   { id: '2', title: 'Supervisor', content: 'Supervisor Content', reports:[]  }
    // ];
  
    // this.reports = [
    //   { id: '1', Name: 'Facebook Report', Description: 'Facebook Content',isChecked:false },
    //   { id: '2', Name: 'Insta Report', Description: 'Insta Content',isChecked:false },
    //   { id: '3', Name: 'Google Report', Description: 'Google Content',isChecked:false }
    // ];

    // this.tabs.forEach(actor => {
    //   actor.reports = this.reports.map(report => ({ ...report }));
    // });

  }

  selectTab(tab: any) {
    this.selectedTab = tab;
    this.getReports();
  }
  
  getActors()
  {
    this.commonService.GetActors().subscribe({
      next: (res: any) => {
        this.spinnerServerice.hide();
        this.tabs = res;
        this.selectedTab = this.tabs[0];
        this.getCompanyTeams();
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      }
    });
  }

  getReports()
  {
    this.spinnerServerice.show();
    this.teamSlugObj.companyId = 0;
    this.teamSlugObj.teamSlug = this.teamSlug;
    this.teamSlugObj.actorId = this.selectedTab.id;
    this.commonService.GetReports(this.teamSlugObj).subscribe({
      next: (res: any) => {
        this.spinnerServerice.hide();
        this.reports = res;
        this.tabs.forEach(actor => {
          if(actor.id == this.selectedTab.id)
          {
            actor.reports = this.reports.map(report => ({ ...report }));
          }
        });
      },
      error: (err: HttpErrorResponse) => {
        this.spinnerServerice.hide();
        console.error(err);
      }
    });
  }

  getCompanyTeams(){
    this.spinnerServerice.show();
    this.commonService.GetCompanyTeams().subscribe({
     next: (res: any) => {
      this.spinnerServerice.hide();
       this.initialTeams = res;
       this.initialTeams = this.initialTeams.filter(a=>a.typeId > 10);
       if(this.initialTeams.length > 0)
       {
        this.teamsList = this.initialTeams;
        this.showTabs = false;
       }
       else{
        this.teamsList = res;
        this.showTabs = true;
        this.teamSlug = this.teamsList[0].slug;
        this.getReports();
       }

     },
     error: (err: HttpErrorResponse) => {
      this.spinnerServerice.hide();
      console.error(err);
     }
   });
 }

 onTeamSelect()
 {
    this.showTabs = true;
    let selectedTeam = this.teamsList.find(a=>a.id == this.teamId);
    this.teamSlug = selectedTeam.slug;
    this.getReports();
 }

  onSubmit(report:any): void {
    if (report) {
        this.finalmodal.actorId = this.selectedTab.id; 
        this.finalmodal.teamSlug = this.teamSlug; 
        this.finalmodal.reportId = report.id; 
        this.finalmodal.isActive = report.isActive; 
        this.spinnerServerice.show();
        this.commonService.AddAccessReports(this.finalmodal).subscribe(
          (response: any) => {
            this.spinnerServerice.hide();
          },
          (error: any) => {
            console.error('Error creating template:', error);
          }
        );
      }else {
      // Handle form validation errors
    }
  }




}
