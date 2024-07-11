import { CommonModule } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, FormControl, Validators, FormArray } from '@angular/forms';
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
  currentTags: any[] = [];
  switchId = 'flexSwitchCheckChecked';
  selectedEntity: string = "";
  entities: any[] = [];
  ruleTypes: any[] = [];
  ruleTypeTags = {};
  entitySet: any = [];
  showQueryRulesTab: boolean = false;
  ruleId: any;
  count = 0;
  cards: any[] = []
  selectedService: any;
  rulesEntities: any;
  selectedRuleTypeName: string = '';
  public queryCtrl!: FormControl;
  selectedRuleSet!: RuleSet;
  public oDataFilter: string = "hello";
  public config: QueryBuilderConfig = {
    fields: {}
  };
  constructor(private _fb: FormBuilder,
    private router: Router,
    private _cs: CommonDataService,
    private ngZone: NgZone,
    private _route: ActivatedRoute) {
    this.queryCtrl = this._fb.control(this.query);
    this.queryCtrl.valueChanges.subscribe((ruleSet: any) => {
      this.count = ruleSet.rules.length
      this.processRules(ruleSet.rules);
      this.selectedRuleSet = ruleSet;
    });
  }
  ngOnInit(): void {
    // this._cs.GetEntitiesRule().subscribe((response: any) => {
    //   this.entities = response;
    //   this.selectedEntity = "Engage";
    //   this.selectEntity();
    //   this.entities = this.entities.filter(entity => entity === "Engage");
    // });
    // this.ruleId = this._route.snapshot.paramMap.get('id');
    this.addRule();
    this.loadServices()
    this.ruleType()
    //this.addMore();
  }
  rulesForm = new FormGroup({
    ruleName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    description: new FormControl('', Validators.required),
    selectedService: new FormControl('', Validators.required),
    entityName: new FormControl('', Validators.required),
    rulesJson: new FormArray([]),
    ruleTag: new FormControl('', Validators.required),
    status: new FormControl(true, Validators.required),
    ruleType: new FormControl('', Validators.required),
  })
  createRule() {
    return new FormGroup({
      field: new FormControl('', [Validators.required]),
      operator: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
      type: new FormControl('')
    })
  }
  get rulesJsonFormArray(): FormArray {
    return this.rulesForm.get('rulesJson') as FormArray;
  }
  get ruleName() { return this.rulesForm.get('ruleName'); }
  get description() { return this.rulesForm.get('description'); }
  public query: RuleSet = {
    condition: 'and',
    rules: []
  };
  ruleType() {
    this._cs.GetRuleType().subscribe(
      (response: any) => {
        this.ruleTypes = response
        // this.ruleTypes = response.map((item: any) => item.name);
      },
      (error: any) => {
        console.error('Error fetching services:', error);
      }
    );
  }
  onRuleTypeChange(event: any) {
    const selectedRuleTypeId = event.target.value;
    if (!selectedRuleTypeId) return;
    this.rulesForm.get('ruleType')?.setValue(selectedRuleTypeId);
    const selectedRuleType = this.ruleTypes.find(type => type.mainId === parseInt(selectedRuleTypeId));
    this.selectedRuleTypeName = selectedRuleType ? selectedRuleType.name : '';
    this._cs.GetRuleTag(13).subscribe(
      (response: any) => {
        this.currentTags = response
      },
      (error: any) => {
        console.error('Error fetching rule tags:', error);
      }
    );
  }
  addMore() {
    this.cards.push({});
  }
  removeCard(index: number) {
    if (index > 0) {
      this.rulesJsonFormArray.removeAt(index);
    }
  }
  getFieldType(card: any) {
    const field = card.get('field')?.value;
    if (field) {
      const fieldConfig = this.config.fields[field];
      if (fieldConfig) {
        switch (fieldConfig.type) {
          case 'integer':
          case 'number':
            return 'number';
          case 'boolean':
            return 'checkbox';
          case 'date':
            return 'date';
          default:
            return 'text';
        }
      }
    }
    return 'text';
  }
  processRules(rules: any[]) {
    rules?.forEach((rule: any) => {
      if (rule.rules) {
        this.processRules(rule.rules);
      } else {
        const fieldConfig = this.entitySet.find((entity: any) => entity.entityName === rule.field);
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
  addRule() {
    
    this.rulesJsonFormArray.push(this.createRule());
  }
  // services: string[] = ['Facebook', 'Instagram', 'Twitter', 'WhatsApp', 'Engage', 'Outlook'];
  services: any[] = [];
  loadServices(): void {
    this._cs.GetPlatorm().subscribe(
      (response: any) => {
        // this.services = Object.keys(response).map(key => ({
        //   id: parseInt(key),
        //   platformName: response[key]
        // }));
        this.services = response
      },
      (error: any) => {
        console.error('Error fetching services:', error);
      }
    );
  }
  onServiceSelect() {
    const selectedServiceId = this.rulesForm.value['selectedService'];
    if (selectedServiceId) {
      this._cs.GetConsoleEntities(selectedServiceId).subscribe(
        (response: any) => {
          this.entities = Object.keys(response).map(key => ({
            id: parseInt(key),
            entityName: response[key]
          }));
          this.showQueryRulesTab = true;
        },
        (error: any) => {
          console.error('Error fetching entities:', error);
          this.showQueryRulesTab = false;
        }
      );
    } else {
      this.showQueryRulesTab = false;
    }
  }
  selectEntity() {
    const selectedEntityId = this.rulesForm.value['entityName'];
    if (selectedEntityId) {
      this._cs.GetConsoleEntityProperties(selectedEntityId).subscribe(
        (response: any) => {
          if (Array.isArray(response)) {
            this.entitySet = [];
            response.forEach((item: any) => {
              let obj: EntityTypeBuilder = {
                entityName: item.name,
                entityType: item.type
              };
              this.entitySet.push(obj);
            });
            this.config.fields = {};
            response.forEach((obj: any) => {
              let typeValue = obj.type;
              let operators: string[] = [];
              switch (obj.type) {
                case 'integer':
                  typeValue = 'number';
                  operators = ["equal", "not_equal", "not_in", "less_or_equal", "greater_or_equal", "not_between", "begins_with", "not_begins_with", "is_null"];
                  break;
                case 'boolean':
                  operators = ["equal"];
                  break;
                case 'string':
                  operators = ["equal", "not_equal", "contains", "like"];
                  break;
                case 'DateTime':
                case 'date':
                  typeValue = 'date';
                  operators = ["equal", "not_equal", "not_in", "less_or_equal", "greater_or_equal", "not_between", "begins_with", "not_begins_with", "is_null"];
                  break;
                default:
                  typeValue = 'number';
              }
              this.config.fields[obj.name] = { name: obj.name, type: typeValue, operators: operators };
            });
          } else {
            console.error("Response is not an array");
          }
        },
        (error: any) => {
          console.error('Error fetching entity properties:', error);
        }
      );
    }
  }
  // GetDataofChannelproperties() {
  //   this._cs.GetRuleEntityProperties(this.rulesForm.value['entityName']).subscribe((response) => {
  //     if (Array.isArray(response)) {
  //       this.entitySet = [];
  //       response?.forEach((item) => {
  //         let obj: EntityTypeBuilder = {
  //           entityName: item.entityName,
  //           entityType: item.entitytype
  //         };
  //         this.entitySet.push(obj);
  //       })
  //       this.config.fields = {};
  //       response?.forEach((obj: any, index) => {
  //         let typeValue = obj.entitytype;
  //         let operators: string[] = [];
  //         switch (obj.entitytype) {
  //           case 'integer':
  //             typeValue = 'number';
  //             operators = ["equal", "not_equal", "not_in", "less_or_equal", "greater_or_equal", "not_between", "begins_with", "not_begins_with", "is_null"]
  //             break;
  //           case 'boolean':
  //             operators = ["equal"]
  //             break;
  //           case 'string':
  //             operators = ["equal", "not_equal", "contains", "like"]
  //             break;
  //           case 'datetime':
  //             typeValue = 'date';
  //             operators = ["equal", "not_equal", "not_in", "less_or_equal", "greater_or_equal", "not_between", "begins_with", "not_begins_with", "is_null"]
  //             break;
  //           case 'date':
  //             operators = ["equal", "not_equal", "not_in", "less_or_equal", "greater_or_equal", "not_between", "begins_with", "not_begins_with", "is_null"]
  //             break;
  //           default:
  //             typeValue = 'number';
  //         }
  //         const fieldsObj = {
  //           name: obj.entityName,
  //           type: typeValue,
  //           operators: operators,
  //         };
  //         this.config.fields[obj.entityName] = fieldsObj;
  //         console.log('changes process ==>', this.config.fields)
  //       });
  //     } else {
  //       console.error("response is not an array");
  //     }
  //   })
  // }
  // GetFBproperties() {
  //   
  //   this._cs.GetRuleEntitiesProperties(this.rulesForm.value['entityName']).subscribe((response) => {
  //     if (Array.isArray(response)) {
  //       this.entitySet = [];
  //       response?.forEach((item) => {
  //         let obj: EntityTypeBuilder = {
  //           entityName: item.entityName,
  //           entityType: item.entitytype
  //         };
  //         this.entitySet.push(obj);
  //       })
  //       this.config.fields = {};
  //       response?.forEach((obj: any, index) => {
  //         let typeValue = obj.entitytype;
  //         let operators: string[] = [];
  //         switch (obj.entitytype) {
  //           case 'integer':
  //             typeValue = 'number';
  //             operators = ["equal", "not_equal", "not_in", "less_or_equal", "greater_or_equal", "not_between", "begins_with", "not_begins_with", "is_null"]
  //             break;
  //           case 'boolean':
  //             operators = ["equal"]
  //             break;
  //           case 'string':
  //             operators = ["equal", "not_equal", "contains", "like"]
  //             break;
  //           case 'datetime':
  //             typeValue = 'date';
  //             operators = ["equal", "not_equal", "not_in", "less_or_equal", "greater_or_equal", "not_between", "begins_with", "not_begins_with", "is_null"]
  //             break;
  //           case 'date':
  //             operators = ["equal", "not_equal", "not_in", "less_or_equal", "greater_or_equal", "not_between", "begins_with", "not_begins_with", "is_null"]
  //             break;
  //           default:
  //             typeValue = 'number';
  //         }
  //         const fieldsObj = {
  //           name: obj.entityName,
  //           type: typeValue,
  //           operators: operators,
  //         };
  //         this.config.fields[obj.entityName] = fieldsObj;
  //         console.log('changes process ==>', this.config.fields)
  //       });
  //     }
  //   })
  // }
  ruleTagValue(event: any) {
    const selectedTag = event.target.value;
    this.rulesForm.get('ruleTag')?.setValue(selectedTag);  // Update form control
  }
  // onClick() {
  //   
  //   console.log("this.selectedRuleSet", this.rulesForm.value)
  //   const rulesJson = {
  //     condition: "and",
  //     rules: [
  //       {
  //         condition: "and",
  //         rules: this.rulesForm.value.rulesJson || []
  //       }
  //     ]
  //   };
  //   const ruleData = {
  //     id: 0,
  //     name: this.rulesForm.value['ruleName'],
  //     description: this.rulesForm.value['description'],
  //     companyId: 0,
  //     ruleTag: this.rulesForm.value['ruleTag'],
  //     status: this.rulesForm.value['status'],
  //     rulesJson: JSON.stringify(rulesJson),
  //     entityName: this.rulesForm.value['entityName'],
  //     ruleType: this.selectedRuleTypeName,
  //     configs: (this.rulesForm.value.rulesJson || []).map((rule: any) => ({
  //       propertyName: rule.field,
  //       condition: rule.operator,
  //       value: rule.value
  //     }))
  //   };
  //   console.log("json data ===>", this.selectedRuleSet)
  //   if (this.rulesForm.value['selectedService'] === '2') {
  //     this._cs.AddFBRule(ruleData).subscribe((res: any) => {
  //       this.router.navigate(['console/rules']);
  //     });
  //   } if (this.rulesForm.value['selectedService'] === 'Engage') {
  //     this._cs.AddRules(ruleData).subscribe((res) => {
  //       this.router.navigate(['console/rules']);
  //     });
  //   }
  // }
   onClick() {
    const rulesFormValue = this.rulesForm.value;
    const rulesJson = {
        condition: "and",
        rules: [
            {
                condition: "and",
                rules: rulesFormValue.rulesJson || []
            }
        ]
    };
    const ruleData = {
        id: 0,
        name: rulesFormValue.ruleName,
        description: rulesFormValue.description,
        companyId: 0,
        ruleTag: rulesFormValue.ruleTag,
        status: rulesFormValue.status,
        rulesJson: JSON.stringify(rulesJson),
        entityName: '', // Clear entityName field for now
        ruleType: this.selectedRuleTypeName,
        configs: (rulesFormValue.rulesJson || []).map((rule: any) => ({
            propertyName: rule.field,
            condition: rule.operator,
            value: rule.value
        })),
        platForm: '' ,
        channel:''
    };
    const selectedService = this.services.find(service => service.id === parseInt(rulesFormValue.selectedService!));
    if (selectedService) {
        ruleData.platForm = selectedService.slug; 
    }
    const selectedEntity = this.entities.find(entity => entity.id === parseInt(rulesFormValue.entityName!));
    if (selectedEntity) {
        ruleData.entityName = selectedEntity.entityName; 
    }
    console.log("Form Data:", ruleData);
    const selectedServiceId = rulesFormValue.selectedService;
    // switch (selectedServiceId) {
        // case '8': // Facebook
            this._cs.AddFBRule(ruleData).subscribe(
                (res: any) => {
                    this.router.navigate(['console/rules']);
                },
                (error: any) => {
                    console.error('Error adding rule for Facebook:', error);
                }
            );
            // break;
        // case '3': // Instagram
            // Add logic for Instagram API call
            // break;
        // case '4': // LinkedIn
            // Add logic for LinkedIn API call
            // break;
        // Add cases for other platforms as needed
        // default:
            console.error('Invalid platform selected');
            // break;
    // }
}
  cancelbtn() {
    this.router.navigate(['console/rules']);
  }
}
