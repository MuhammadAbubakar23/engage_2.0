import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Import the necessary form-related modules
import { ReportService } from '../../services/report.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { Router } from '@angular/router';
@Component({
  selector: 'app-report-db-settings',
  standalone: true,
  imports: [
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule],
  templateUrl: './report-db-settings.component.html',
  styleUrls: ['./report-db-settings.component.scss']
})
export class ReportDbSettingsComponent implements OnInit {
  dbSettingsForm!: FormGroup;
  selectedEngine: string = "Please select engine";
  engineOptions: string[] = ['Microsoft SQL Server', 'My SQL'];
  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private _route:Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.dbSettingsForm = this.formBuilder.group({
      ConnectionName: ['', Validators.required],
      ENGINE: ['Please select engine', Validators.required],
      DATABASE: ['', Validators.required],
      USER: ['', Validators.required],
      PASSWORD: ['', Validators.required],
      HOST: ['', Validators.required],
      PORT: ['', Validators.required]
    });
  }

  saveSetting() {

    if (this.dbSettingsForm.invalid) {
      alert("Please fill all fields")
      return;
    }

    const data = {
      "connection_name": this.dbSettingsForm.value.ConnectionName,
      "engine": this.selectedEngine,
      "name": this.dbSettingsForm.value.DATABASE,
      "user": this.dbSettingsForm.value.USER,
      "password": this.dbSettingsForm.value.PASSWORD,
      "host": this.dbSettingsForm.value.HOST,
      "port": this.dbSettingsForm.value.PORT
    };

    console.log("ok", data);
    this.reportService.createDbSetiingApi(data).subscribe((res) => {
      console.log(res);
      alert(res);
      this._route.navigateByUrl('/analytics/db-settings')
    });
    console.log('Saving settings:', this.dbSettingsForm.value);
  }
}
