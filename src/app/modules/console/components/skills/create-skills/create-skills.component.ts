import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import {
  ReactiveFormsModule,
  FormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators, FormControl, FormControlName, FormBuilder, FormGroup,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AddSkillMembersComponent } from '../add-skill-members/add-skill-members.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DataExchangeServicesService } from 'src/app/services/dataExchangeServices/data-exchange-services.service';
import { Subscription, finalize } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { descriptors } from 'chart.js/dist/core/core.defaults';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-create-skills',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AddSkillMembersComponent, MatChipsModule, MatIconModule, MatSelectModule],
  templateUrl: './create-skills.component.html',
  styleUrls: ['./create-skills.component.scss']
})
export class CreateSkillsComponent implements OnInit {
  toastermessage = false
  AlterMsg = "Team Information Add Successfully"
  isActive = false;
  text: any = 'Team Name'
  isChecked: boolean = false
  selectedIds: any[] = []
  allselected: boolean = false
  showIcon: boolean = false;
  fillter: any = "Roles";
  isSelectedTeam: any = '';
  isSelectedTeamArray: any = []
  isBusnisshours: any[] = []
  isSelectedWing: any[] = []
  selectedTextColor: string = '';
  isSlaPolicies: any[] = []
  isAllTagsSelected: boolean = false
  isCheckedAllTags: boolean = false
  isSelectedTagsId: any[] = []
  sort: any = ''
  selectedKey: string | null = null;
  sortDir = 1
  selectedTags: string[] = [];
  selectedKeywords: string[] = [];
  selectedSubkeys: { [key: string]: string[] } = {};
  skillTags = [];
  gettagId: any;
  showDropdownState: { [key: string]: boolean } = {};
  isSelectedtagsId: any[] = []
  SkilltagId: any[] = [];
  teamnameuser: any = ''
  TagsLists: any[] = [];
  subTags: any[] = []
  childtags: any[] = []
  subChildTags: any[] = []
  //TagsList: any[] = []
  Keywords: any[] = []
  subkey: any[] = []
  sendtoastervalue: any;
  skilltotaster: any
  loacSelectedId: any
  id: any;
  selectedRules: string[] = [];
  showPopup: boolean = false;
  updateSelectedRules(id: number) {
    this.subRules.forEach((item: any) => {
      if (item.id === id) {
        item.isSelected = true;
      }
    })
    this.selectedRules = this.subRules
      .filter(rule => rule.isSelected)
      .map(rule => rule.name);
  }
  removeSelectedRule(rule: string) {
    const index = this.selectedRules.indexOf(rule);
    if (index !== -1) {
      this.selectedRules.splice(index, 1);
    }
    // Update isSelected property in subRules array
    const selectedRule = this.subRules.find(r => r.name === rule);
    if (selectedRule) {
      selectedRule.isSelected = false;
    }
  }
  onTextColorChange(event: any) {
    this.selectedTextColor = event.target.value
  }
  openPopup() {
    this.showPopup = !this.showPopup
  }
  // userForm : UntypedFormGroup = new UntypedFormGroup({
  // teamname : new UntypedFormControl(),
  // description : new UntypedFormControl(),
  // businesshours : new UntypedFormControl(),
  // supportchannelhour : new UntypedFormControl(),
  // skillRules : new UntypedFormControl(),
  // });
  submitted = false;
  username: string = ''
  public subscription!: Subscription
  subRules: any[] = []
  GetRules() {
    const data = {
      search: '',
      sorting: '',
      pageNumber: 1,
      pageSize: 100
    }
    this.commondata.GetAllRules(data).subscribe((res: any) => {
      this.subRules = res.Rules.map((rule: any) => ({ ...rule, isSelected: false }));
    })
  }
  constructor(private formbuilder: FormBuilder, private router: Router,
    private ExchangeData: DataExchangeServicesService,
    private changeDetecte: ChangeDetectorRef,
    private commondata: CommonDataService,
    private activeRoute: ActivatedRoute) {
  }
  userForm = new FormGroup({
    teamname: new FormControl('', [Validators.required,
    Validators.minLength(2),
    Validators.maxLength(25),
    this.customTeamnameValidator
    ]),
    description: new FormControl('', [Validators.required]),
    businesshours: new FormControl('', [Validators.required]),
    wingSlug: new FormControl('', [Validators.required]),
    SlaPolicy: new FormControl('', [Validators.required]),
    icon:new FormControl('',[])
  })
  customTeamnameValidator(control: AbstractControl): ValidationErrors | null {
    const pattern = /^[a-zA-Z ]+$/;
    if (control.value && !pattern.test(control.value)) {
      return { invalidTeamname: true };
    }
    return null;
  }
  ngOnInit() {
    this.GetRules()
    this.getTagsList()
    this.getallbusinessHours()
    this.getAllSlaPolicies()
    this.getSkillsById()
    this.getAllWing()
    // this.getAllkeyword()
  }
  selectRulesBasedOnSkillTags(selectedRules: any): void {
    this.selectedRules = [];
    for (const rule of selectedRules) {
      this.selectRuleById(rule.id, this.subRules);
    }
  }
  selectRuleById(id: number, rules: any[]): void {
    this.selectedRules = [];
    const ruleToCheck = rules.find(rule => rule.id === id);
    if (ruleToCheck) {
      ruleToCheck.isSelected = true;
      this.selectedRules.push(ruleToCheck.name);
    }
  }
  checkTagsBasedOnSkillTags(skillTags: any): void {
    for (const skillTag of skillTags) {
      this.checkTagById(skillTag.id, this.TagsLists);
    }
  }
  checkTagById(id: number, tags: any[]): void {
    this.checkedIds = []
    const tagToCheck = tags.find(tag => tag.mainId === id);
    if (tagToCheck) {
      tagToCheck.isChecked = true;
      this.checkedIds.push(tagToCheck.mainId)
      if (tagToCheck.subTags) {
        for (const subTag of tagToCheck.subTags) {
          subTag.isChecked = true;
          this.checkedIds.push(subTag.mainId)
        }
      }
    }
  }
  getSkillsById() {
    this.id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    if (this.id) {
      this.commondata.editSkill(this.id).subscribe((res: any) => {
        this.userForm.patchValue({
          "teamname": res.name,
          "description": res.descreption,
          "businesshours": res.businessHoursId,
          "SlaPolicy": res.slaPolicyId,
          "wingSlug": res.wingSlug
        });
        this.checkTagsBasedOnSkillTags(res.skillTags);
        this.selectRulesBasedOnSkillTags(res.skillRules);
      });
    }
  }
  AddTeamMembers() {
    this.isActive = !this.isActive;
  }// get all business Hours
  getallbusinessHours() {
    const data = {}
    this.commondata.GetBusinessHours(data).subscribe((res: any) => {
      this.isBusnisshours = res.BusinessHours
    })
  }
  // get all Sla Policies
  getAllSlaPolicies() {
    const data = {}
    this.commondata.GetSlaPolicy(data).subscribe((res: any) => {
      this.isSlaPolicies = res.SLAPolices
    })
  }
  getTagsList() {
    this.commondata.GetTagsByCompanyId().subscribe((res: any) => {
      this.TagsLists = res
      this.TagsLists.forEach((tag: any) => {
        tag['isChecked'] = false;
        if (tag.subTags) {
          tag.subTags.forEach((subTag: any) => {
            subTag['isChecked'] = false;
          });
        }
      })
    })
  }
  getAllWing() {
    this.commondata.GetAllWing().subscribe((res: any) => {
      this.isSelectedWing = res;
      // this.isSelectedWing = [...this.Wing.map(wing => ({ id: wing.id, name: wing.name, slug: wing.slug }))];
    })
  }
  checkedIds: number[] = [];
  checkParent(parentIndex: number): void {
    const parent = this.TagsLists[parentIndex];
    parent.isChecked = !parent.isChecked;
    if (parent.subTags) {
      for (const child of parent.subTags) {
        child.isChecked = parent.isChecked;
      }
    }
    this.updateParentCheckedState(parent);
  }
  checkChild(parentIndex: number, child: any): void {
    const parent = this.TagsLists[parentIndex];
    child.isChecked = !child.isChecked;
    this.updateParentCheckedState(parent);
  }
  updateParentCheckedState(parent: any): void {
    const anyChildChecked = parent.subTags ? parent.subTags.some((c: any) => c.isChecked) : false;
    if (parent.subTags) {
      if (anyChildChecked) {
        parent.isChecked = true;
      } else {
        parent.isChecked = false;
      }
    }
  }
  toggleDropdown(tagName: string) {
    this.showDropdownState[tagName] = !this.showDropdownState[tagName];
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  getCheckedIds(): number[] {
    const checkedIds: number[] = [];
    this.TagsLists.forEach(parent => {
      if (parent.isChecked) {
        checkedIds.push(parent.mainId);
      }
      if (parent.subTags) {
        parent.subTags.forEach((child: any) => {
          if (child.isChecked) {
            checkedIds.push(child.mainId);
          }
        });
      }
    });
    return checkedIds;
  }
  isresponderchecked: boolean = false
  isInboxChecked: boolean = false
  onSubmit() {
    if (this.userForm.valid) {
      let data = {
        "id": this.id,
        "name": this.userForm.value.teamname,
        "descreption": this.userForm.value.description,
        "businessHourId": Number(this.userForm.value.businesshours),
        "wingSlug": this.userForm.value.wingSlug,
        "slaPolicyId": Number(this.userForm.value.SlaPolicy),
        "skillTags": this.getCheckedIds(),
        "skillRules": this.subRules.filter(rule => rule.isSelected).map(rule => rule.id),
        "responder": this.isresponderchecked,
        "inbox": this.isInboxChecked,
        "color": this.selectedTextColor,
        "icon": this.userForm.value.icon,
      }
      if (this.id && this.id !== null) {
        this.commondata.UpdateSkill(this.id, data).subscribe((res: any) => {
          this.router.navigateByUrl('/console/skills');
          this.sendtoastervalue = "updateSkill"
        })
      }
      else {
        this.commondata.AddSkill(data).subscribe((res: any) => {
          this.sendtoastervalue = 'skilladd'
          this.userForm.reset()
          this.router.navigateByUrl('/console/skills')
        })
      }
    }
    else {
      this.markFormGroupTouched(this.userForm);
    }
  }
  routerLink() {
    this.router.navigateByUrl('/console/skills')
  }
}
