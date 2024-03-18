import { CommonModule } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QueryBuilderClassNames, QueryBuilderConfig, QueryBuilderModule, RuleSet } from 'angular2-query-builder';
import { CommonDataService } from '../../../../../shared/services/common/common-data.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { EntityTypeBuilder } from 'src/app/shared/Models/EntityTypeDto';

@Component({
  selector: 'app-add-rules',
  standalone: true,
  imports: [RouterModule, CommonModule, QueryBuilderModule, FormsModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './add-rules.component.html',
  styleUrls: ['./add-rules.component.scss']
})
export class AddRulesComponent implements OnInit {

  entities = [];
  selectedEntity = "Please Select Entity";

  rulesForm = new FormGroup({
    ruleName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    description: new FormControl('', Validators.required),
    // rulesJson: new FormControl('')
    
  })
  get ruleName() { return this.rulesForm.get('ruleName'); }
  get description() { return this.rulesForm.get('description'); }
  public query: RuleSet = {
    condition: 'and',
    rules: []
  };
  public queryCtrl!: FormControl;
  selectedRuleSet!: RuleSet;
  public oDataFilter: string = "hello";

  public config: QueryBuilderConfig = {
    fields: {}
  };
  classNames: QueryBuilderClassNames = {
    // removeIcon: 'fa fa-minus',
    // addIcon: 'fa fa-plus',
    // arrowIcon: 'fa fa-chevron-right px-2',
    // button: 'btn',
    // buttonGroup: 'btn-group',
    // rightAlign: 'order-12 ml-auto',
    // switchRow: 'd-flex px-2',
    // switchGroup: 'd-flex align-items-center',
    // switchRadio: 'custom-control-input',
    // switchLabel: 'custom-control-label',
    // switchControl: 'custom-control custom-radio custom-control-inline',
    // row: 'row p-2 m-1',
    // rule: 'border',
    // ruleSet: 'border',
    // invalidRuleSet: 'alert alert-danger',
    // emptyWarning: 'text-danger mx-auto',
    // operatorControl: 'form-control',
    // operatorControlSize: 'col-auto pr-0',
    // fieldControl: 'form-control',
    // fieldControlSize: 'col-auto pr-0',
    // entityControl: 'form-control',
    // entityControlSize: 'col-auto pr-0',
    // inputControl: 'form-control mt-2',
    // inputControlSize: 'col-auto'
  }

  entitySet: any = [];
  ruleId: any;

  constructor(private _fb: FormBuilder,
    private router: Router,
    private _cs: CommonDataService,
    private ngZone: NgZone,
    private _route: ActivatedRoute) {
    this.queryCtrl = this._fb.control(this.query);
    this.queryCtrl.valueChanges.subscribe((ruleSet: any) => {
      this.processRules(ruleSet.rules);
      this.selectedRuleSet = ruleSet;
    });

  }



  processRules(rules: any[]) {
    rules?.forEach((rule: any) => {
        if (rule.rules) {
            this.processRules(rule.rules);
        } else {
            const fieldConfig = this.entitySet.find((entity:any) => entity.entityName === rule.field);
            console.log("field set confiye==>", fieldConfig)
            if (fieldConfig) {
                rule.type = fieldConfig.entityType;
                // rule.entity = rule.field; // Assuming entity should be the same as the field
                if (Array.isArray(rule.value)) {
                    console.log("ok");
                } else if (rule.value !== undefined && rule.value !== null) {
                    rule.value = [rule.value];
                }
            } else {
                console.error(`Field config not found for field: ${rule.field}`);
            }
        }
    });
}

  ngOnInit(): void {
    this._cs.GetEntitiesRule().subscribe((response: any) => {
      this.entities = response;
    })
    this.ruleId = this._route.snapshot.paramMap.get('id')
    // this.getRuleById(this.ruleId)

  }
  // getRuleById(ruleId: string) {
  //   this._cs.GetRuleById(ruleId).subscribe((res: any) => {
  //     console.log('getting', res)
  //     this.rulesForm.patchValue({

  //       description: res.description,
  //       ruleName: res.name,
  //       // rulesJson: JSON.parse(res.rulesJson),
  //       // tableName :res.tableName

  //     });
  //     this.selectedRuleSet = JSON.parse(res.rulesJson);
  //     this.loadExistingRuleSet();
  //   },
  //     (error: any) => {
  //       console.log('API error:', error);
  //     })

  // }
  selectEntity() {

    this._cs.GetRuleEntityProperties(this.selectedEntity).subscribe((response) => {

      if (Array.isArray(response)) {
        this.entitySet = [];
        response?.forEach((item) => {
          let obj: EntityTypeBuilder = {
            entityName: item.entityName,
            entityType: item.entitytype
          };
          this.entitySet.push(obj);
        })
        this.config.fields = {};
        response?.forEach((obj: any, index) => {
          let typeValue = obj.entitytype;
          let operators: string[] = [];
          switch (obj.entitytype) {
            case 'integer':
              typeValue = 'number';

              operators = ["equal", "not_equal", "not_in", "less_or_equal", "greater_or_equal", "not_between", "begins_with", "not_begins_with", "is_null"]
              break;
            case 'boolean':
              operators = ["equal"]
              break;
            case 'string':
              operators = ["equal", "not_equal", "contains", "like"]
              break;
            case 'datetime':
              typeValue = 'date';
              operators = ["equal", "not_equal", "not_in", "less_or_equal", "greater_or_equal", "not_between", "begins_with", "not_begins_with", "is_null"]
              break;
            case 'date':
              operators = ["equal", "not_equal", "not_in", "less_or_equal", "greater_or_equal", "not_between", "begins_with", "not_begins_with", "is_null"]
              break;
            default:
              typeValue = 'number';
          }

          const fieldsObj = {
            name: obj.entityName,
            type: typeValue,
            operators: operators,

          };


          this.config.fields[obj.entityName] = fieldsObj;
          console.log('changes process ==>' ,this.config.fields)
        });
        //this.loadExistingRuleSet();
      } else {
        console.error("response is not an array");
      }
    })
    // this.loadExistingRuleSet();
  }
  // loadExistingRuleSet() {
  //   if (this.selectedRuleSet) {
  //     this.query = this.selectedRuleSet;
  //     this.queryCtrl.setValue(this.query);
  //   }
  // }

  onClick() {

    const ruleData = {
      "name": this.rulesForm.value['ruleName'],
      "description": this.rulesForm.value['description'],
      'rulesJson': JSON.stringify(this.selectedRuleSet)
    };
    console.log("json data ===>", this.selectedRuleSet)
    if (this.ruleId) {
      this._cs.UpdateRules({ ...ruleData, "id": this.ruleId }).subscribe((res: any) => {
        this.router.navigate(['console/rules']);
      });
    } else {
      this._cs.AddRules(ruleData).subscribe((res) => {
        this.router.navigate(['console/rules']);
      });
    }
  }
  cancelbtn() {
    this.router.navigate(['console/rules']);
  }
}









