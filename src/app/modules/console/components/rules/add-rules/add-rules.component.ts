import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { QueryBuilderConfig, QueryBuilderModule } from 'angular2-query-builder';
import { CommonDataService } from '../../../../../shared/services/common/common-data.service';
@Component({
  selector: 'app-add-rules',
  standalone: true,
  imports: [RouterModule, CommonModule, QueryBuilderModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-rules.component.html',
  styleUrls: ['./add-rules.component.scss']
})
export class AddRulesComponent implements OnInit {
  rulesForm!: FormGroup;
  query: any = {}; // Initialize an empty object for query
  // query1: any = {}; // Initialize an empty object for query1
  constructor(private formBuilder: FormBuilder, private commonService: CommonDataService, private router: Router) { }
  ngOnInit(): void {
    this.rulesForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      rulesJson: [''],
      queryBuilderFilterRuleDto: this.formBuilder.group({
        // Define the form controls for 'queryBuilderFilterRuleDto'
        id: [''],
        condition: [''],
        field: [''],
        input: [''],
        operator: [''],
        type: [''],
        value: this.formBuilder.array(['']),
        rules: this.formBuilder.array([
          this.formBuilder.group({
            condition: [''],
            field: [''],
            id: [''],
            input: [''],
            operator: [''],
            rules: this.formBuilder.array(['']),   
            type: [''],
            value: this.formBuilder.array(['']),
          }),
        ]),
      }),
    });
  }
  config: QueryBuilderConfig = {
    fields: {
      From: { name: 'From', type: 'number' },
      gender: {
        name: 'Gender', type: 'category',
        options: [
          { name: 'Male', value: 'm' },
          { name: 'Female', value: 'f' },
          { name: 'Other', value: 'o' }
        ]
      },
      city: {
        name: 'city', type: 'category',
        options: [
          { name: 'lahore', value: 'lahore' },
          { name: 'Isb', value: 'iIsb' },
          { name: 'faslbad', value: 'faslbad' },
        ]
      },
      degree: {
        name: 'degree', type: 'category',
        options: [
          { name: 'college degree', value: 'college degree' },
          { name: 'uni degree', value: 'uni degree' },
          { name: 'inter degree', value: 'inter degree' },
        ]
      },
      occupation: {
        name: 'occupation', type: 'category',
        options: [
          { name: 'Student', value: 'student' },
          { name: 'Teacher', value: 'teacher' },
          { name: 'Unemployed', value: 'unemployed' },
          { name: 'Scientist', value: 'scientist' }
        ]
      },
      designation: {
        name: 'designation', type: 'category',
        options: [
          { name: 'senior', value: 'senior' },
          { name: 'mid', value: 'mid' },
          { name: 'beginner', value: 'beginner' }
        ]
      },

    }
  }
  config1: QueryBuilderConfig = {
    fields: {
      student: {
        name: 'student', type: 'category',
        options: [
          { name: 'high', value: 'high' },
          { name: 'mid', value: 'mid' },
          { name: 'beginner', value: 'beginner' }
        ]
      },
      Subject: {
        name: 'Subject', type: 'category',
        options: [
          { name: 'maths', value: 'maths' },
          { name: 'computer', value: 'computer' },
          { name: 'English', value: 'English' }
        ]
      },
      Marks: { name: 'Marks', type: 'number' },
    }
  }
  // query = {
  //   condition: 'or',
  //   rules: [
  //     { condition: 'AND', field: 'from', id: '1', input: '', operator: '!=', type: '0', value: 'lahore' },

  //     // { field: 'From', operator: '<=', value: 'Bob' },
  //     // { field: 'gender', operator: '>=', value: 'm' },
  //     // { field: 'city', operator: '=', value: 'abc' },
  //     // { field: 'degree', operator: '!=', value: 'deg' },
  //     // { field: 'occupation', operator: '!=', value: 'ocu' },
  //     // { field: 'designation', operator: '!=', value: 'desg' },
  //   ]
  // }
  // query1 = {
  //   Condition: 'And',
  //   rules: [
  //     // { field: 'student', operator: '!=', value: 'std' },
  //     { condition: '', field: '', id: ';', input: '', operator: '!=', type: '0', value: '' },
  //     // { field: 'Marks', operator: '!=', value: 'mark' }
  //   ]
  // }
  onSave() {
    const formData = this.rulesForm.value;
    formData.queryBuilderFilterRuleDto.query = this.query; // Update the query control's value

    this.commonService.AddRules(formData).subscribe(
      response => {
        console.log('Rules added successfully', response);
        // ... navigate or perform other actions ...
      },
      error => {
        console.error('Failed to add rules', error);
      }
    );
  }
  cancelbtn() {
    this.router.navigate(['console/rules']);

  }
}









