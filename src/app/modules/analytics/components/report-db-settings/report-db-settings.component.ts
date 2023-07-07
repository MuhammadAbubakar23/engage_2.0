import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report-db-settings',
  templateUrl: './report-db-settings.component.html',
  styleUrls: ['./report-db-settings.component.scss']
})
export class ReportDbSettingsComponent implements OnInit {
  dbSettings: any = {
    ConnectionName:'',
    ENGINE:['Microsoft SQL Server','My SQL'],
    DATABASE: '',
    USER: '',
    PASSWORD: '',
    HOST: '',
    PORT: ''
  };
  selectedEngine:any="Please select engine"
  constructor(private reportService:ReportService) { }

  ngOnInit(): void {
    // console.log('');
  }

  saveSetting() {
    const data={  "connection_name":this.dbSettings.ConnectionName,
                  "engine":this.selectedEngine,
                  "name":this.dbSettings.DATABASE,
                  "user" :this.dbSettings.USER,
                  "password" :this.dbSettings.PASSWORD,
                  "host":this.dbSettings.HOST,
                  "port":this.dbSettings.PORT
                }
    // console.log("ok",data)
    this.reportService.createDbSetiingApi(data).subscribe((res)=>{
      // console.log(res);
      alert(res)
    })
    // console.log('Saving settings:', this.dbSettings);

  }
}
