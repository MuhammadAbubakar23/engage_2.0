import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Import the necessary form-related modules
import { ReportService } from '../../services/report.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ActivatedRoute, Router } from '@angular/router';
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

  engineOptions: string[] = ['Microsoft SQL Server', 'My SQL'];
  id: string | null | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private _route: Router,
    private _activatedroute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.id = this._activatedroute.snapshot.paramMap.get('id');
    console.log("Id", this.id);
    if (this.id && this.id !== null) {
      // ID exists, fetch details from API
      this.reportService.getDbSettingById(this.id).subscribe((data) => {
        this.populateFormFields(data); // Populate form fields with retrieved data
      });
    }
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
  populateFormFields(data: any) {
    console.log(data);
    this.dbSettingsForm.patchValue({
      ConnectionName: data.connection_name,
      ENGINE: data.engine,
      DATABASE: data.name,
      USER: data.user,
      PASSWORD: data.password,
      HOST: data.host,
      PORT: data.port,
    });
  }
  // saveSetting() {

  //   if (this.dbSettingsForm.invalid) {
  //     alert("Please fill all fields")
  //     return;
  //   }

  //   const data = {
  //     "connection_name": this.dbSettingsForm.value.ConnectionName,
  //     "engine": this.dbSettingsForm.value.Engine,
  //     "name": this.dbSettingsForm.value.DATABASE,
  //     "user": this.dbSettingsForm.value.USER,
  //     "password": this.dbSettingsForm.value.PASSWORD,
  //     "host": this.dbSettingsForm.value.HOST,
  //     "port": this.dbSettingsForm.value.PORT
  //   };

  //   console.log("ok", data);
  //   this.reportService.createDbSetiingApi(data).subscribe((res) => {
  //     console.log(res);
  //     alert(res);
  //     this._route.navigateByUrl('/analytics/db-settings')
  //   });
  //   console.log('Saving settings:', this.dbSettingsForm.value);
  // }
  saveSetting() {
    if (this.dbSettingsForm.invalid) {
      alert("Please fill all fields");
      return;
    }



    const data = {
      "connection_name": this.dbSettingsForm.value.ConnectionName,
      "engine": this.dbSettingsForm.value.ENGINE,
      "name": this.dbSettingsForm.value.DATABASE,
      "user": this.dbSettingsForm.value.USER,
      "password": this.dbSettingsForm.value.PASSWORD,
      "host": this.dbSettingsForm.value.HOST,
      "port": this.dbSettingsForm.value.PORT
    };

    console.log("Data:", data);

    if (this.id && this.id !== null) {

      this.reportService.updateDbSetiingApi(this.id, data).subscribe((res) => {
        console.log("Update response:", res);
        alert("successfully updated");
        this._route.navigateByUrl('/analytics/db-settings');
      });
    } else {

      this.reportService.createDbSetiingApi(data).subscribe((res) => {
        console.log("Create response:", res);
        alert(res);
        this._route.navigateByUrl('/analytics/db-settings');
      });
    }

    console.log('Saving settings:', this.dbSettingsForm.value);
  }
}
