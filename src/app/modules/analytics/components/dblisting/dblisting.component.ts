import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dblisting',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dblisting.component.html',
  styleUrls: ['./dblisting.component.scss']
})
export class DblistingComponent implements OnInit {
  showPanel=false;
  connections:any=[]
  columns=['Connection','Engine','Database','User','Host','Port']
  constructor(private _rs:ReportService) { }

  ngOnInit(): void {
   this._rs.listDbSetiingApi().subscribe((res)=>{
    console.log("Dblisting", res);
    this.connections=res;

   })
  }

}
