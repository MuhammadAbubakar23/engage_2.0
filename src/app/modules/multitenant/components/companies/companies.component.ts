import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ConsoleTableParams } from 'src/app/layouts/engage2/console-table/console-table-params';
import { MenuModel } from 'src/app/layouts/engage2/menu-state/menu.model';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CreateCompaniesComponent } from './create-companies/create-companies.component';

@Component({
  selector: 'companies',
  standalone:true,
  imports:[CommonModule, RouterModule, LayoutsModule, CreateCompaniesComponent],
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  Companies: Array<any> = [];
  CompaniesCount: number = 0;
 
  model:MenuModel[] = [];
  filter?: Observable<ConsoleTableParams>;
  showConsoleTable:boolean= false;
  isActive=false;
  //Companies: Array<any> = [];
 
  constructor(private headerService: HeaderService, private _Activatedroute:ActivatedRoute) { }

  async ngOnInit() {
    this.filter = await this._Activatedroute.snapshot.data["companyJ"];
    if(typeof this.filter !== 'undefined'){
      this.showConsoleTable = true;
    }
    // this.Teams = await this._Activatedroute.snapshot.data["teams"];
    // this.TeamsCount =  this.Teams.length;
    console.log(this.filter);


    // this.Teams =  this._Activatedroute.snapshot.data["teams"];
  }  

  updatevalue(string:any){
    this.headerService.updateMessage(string);
  }
  AddTeamMembers(){
    this.isActive=!this.isActive;
  }
}
