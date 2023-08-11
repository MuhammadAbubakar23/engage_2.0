import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Field, QueryBuilderConfig, QueryBuilderModule, RuleSet } from 'angular2-query-builder';
import { CommonDataService } from '../../../../../shared/services/common/common-data.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-add-rules',
  standalone: true,
  imports: [RouterModule, CommonModule, QueryBuilderModule, FormsModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './add-rules.component.html',
  styleUrls: ['./add-rules.component.scss']
})
export class AddRulesComponent implements OnInit {
  public queryCtrl!: FormControl;
  entities = [];
  selectedEntity = "Please Select Entity";
  public query: RuleSet = {
    condition: 'and',
    rules: [
      // { field: 'age', operator: '>=', entity: 'physical', value: 18 },
      // { field: 'birthday', operator: '=', value: '2018-11-20', entity: 'nonphysical' },
      // {
      //   condition: 'or',
      //   rules: [
      //     { field: 'gender', operator: '=', entity: 'physical', value: 'm' },
      //     { field: 'school', operator: 'is null', entity: 'nonphysical' },
      //     { field: 'notes', operator: '=', entity: 'nonphysical', value: 'Hi' }
      //   ]
      // }
    ]
  };
  selectedRuleSet!: RuleSet;
  public oDataFilter: string = "hello";

  public config: QueryBuilderConfig = {
    fields: {
      // age: { name: 'Age', type: 'number' },
      // gender: {
      //   name: 'Gender',
      //   type: 'category',
      //   options: [
      //     { name: 'Male', value: 'm' },
      //     { name: 'Female', value: 'f' }
      //   ]
      // },
      // name: { name: 'Name', type: 'string' },
      // notes: { name: 'Notes', type: 'string', operators: ['=', '!='] },
      // educated: { name: 'College Degree?', type: 'boolean' },
      // birthday: {
      //   name: 'Birthday', type: 'date', operators: ['=', '<=', '>'],
      //   defaultValue: (() => new Date())
      // },
      // school: { name: 'School', type: 'string', nullable: true },
      // occupation: {
      //   name: 'Occupation',
      //   type: 'category',
      //   options: [
      //     { name: 'Student', value: 'student' },
      //     { name: 'Teacher', value: 'teacher' },
      //     { name: 'Unemployed', value: 'unemployed' },
      //     { name: 'Scientist', value: 'scientist' }
      //   ]
      // }
    }
  };



  constructor(private _fb: FormBuilder, private router: Router, private _cs: CommonDataService, private ngZone: NgZone) {
    console.log("this.query",this.query);
    this.queryCtrl = this._fb.control(this.query);
    this.queryCtrl.valueChanges.subscribe(ruleSet => {
      this.selectedRuleSet = ruleSet;
      console.log("Selected rule set:", this.selectedRuleSet);
    });
  }
  ngOnInit(): void {
    this._cs.GetEntitiesRule().subscribe((response: any) => {
      this.entities = response;

    })
  }

  selectEntity() {

    this._cs.GetRuleEntityProperties(this.selectedEntity).subscribe((response) => {
      console.log("Response", response)
      if (Array.isArray(response)) {
        response.forEach((obj: any,index) => {
          console.log(obj, obj.entitytype, obj.entityName)
          let typeValue;
          let operators: string[]=[];
          switch (obj.entitytype) {
            case 'Int64':
              typeValue = 'number';
              operators=["equal","not equal","greater than","greater than equal to","less than","less than equal to"];
              break;
            case 'Boolean':
              typeValue = 'boolean';
              operators=["equal"]
              break;
            case 'String':
              typeValue = 'string';
              operators=["equal","not equal","contains","like"]
              break;
            case 'DateTime':
              typeValue = 'date';
              operators=["equal","not equal","greater than","greater than equal to","less than","less than equal to"];
              break;
            default:
              typeValue = 'number';

          }

          const fieldsObj = {
            name: obj.entityName,
            type: typeValue,
            operators:operators,
            Type: typeValue,
          };
          this.config.fields[obj.entityName] = fieldsObj;

        });
        console.log("Updated", this.config.fields)
      } else {
        console.error("response is not an array");
      }
    })
  }
  onClick(){
    this._cs.AddRules({"name":"","description":"",'rulesJson':JSON.stringify(this.selectedRuleSet)}).subscribe((res)=>{
      console.log("Rules",res);
      alert("SuccessFully rules Added!");
    })
  }
  cancelbtn() {
    this.router.navigate(['console/rules']);
  }
}









