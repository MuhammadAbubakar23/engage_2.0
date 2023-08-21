import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-dblisting',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dblisting.component.html',
  styleUrls: ['./dblisting.component.scss']
})
export class DblistingComponent implements OnInit {
  showPanel = false;
  connections: any = []
  columns = ['Connection', 'Engine', 'Database', 'User', 'Host', 'Port', 'Action']
  constructor(private _rs: ReportService, private _route: Router, private _hS:HeaderService) { }

  ngOnInit(): void {
    const newObj = {title:'DB Settings',url:'/analytics/db-settings'};
    this._hS.setHeader(newObj);
    this._rs.login().subscribe((token: any) => {
      localStorage.setItem("token", token.access);
      this._rs.listDbSetiingApi().subscribe((res) => {
        console.log("Dblisting", res);
        this.connections = res;

      })
    })

  }

  deletecon(id: any) {
    this._rs.deleteDbSetiingApi(id).subscribe((res) => {
      if(res.status==='success'){
        this.connections=this.connections.filter((c:any) => c.id !== id);
        alert("successfully deleted");
        this._route.navigateByUrl('/analytics/db-settings');
      }
      else{
     alert("Something went wrong");
    }
    });
  }

}
