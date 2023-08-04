import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDataService } from '../services/common/common-data.service';

@Component({
  selector: 'app-right-header-components',
  templateUrl: './right-header-components.component.html',
  styleUrls: ['./right-header-components.component.scss']
})
export class RightHeaderComponentsComponent implements OnInit {

  isActive=false;
  id = localStorage.getItem('agentId');

  constructor(private router : Router,
    private commonService : CommonDataService) { }

  ngOnInit(): void {
    
    this.getAgentDetails();
  }

  Searchfiltercheck(){

    this.isActive=!this.isActive;
   
   }
   signOut(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
   }

   AgentDetails:any;

   getAgentDetails(){
    
    this.commonService.GetAgentById(this.id).subscribe((res:any)=>{
      this.AgentDetails = res;
    });

   }

   updateBreak(){
    
    this.AgentDetails.onBreak = !this.AgentDetails.onBreak;
    this.commonService.UpdateBreak(this.AgentDetails.onBreak).subscribe((res:any)=>{
      if(this.AgentDetails.onBreak == true){
        this.reloadComponent('breakStarted')
      } else if (this.AgentDetails.onBreak == false){
        this.reloadComponent('breakOff')
      }

    })
   }

   AlterMsg:any;
   toastermessage:any;

   reloadComponent(type: any) {
    if (type == 'breakStarted') {
      this.AlterMsg = 'Break status is ON now!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'breakOff') {
      this.AlterMsg = 'Break status is OFF now!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
   
  }
  closeToaster() {
    this.toastermessage = false;
  }
}
