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
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AddSkillMembersComponent ,MatChipsModule, MatIconModule, MatSelectModule],
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
  TagsLists: any[] = []
  childtags: any[] = []
  subChildTags: any[] = []
  TagsList: any[] = []
  Keywords: any[] = []
  subkey: any[] = []
  sendtoastervalue: any;
  skilltotaster: any
  loacSelectedId: any
  id: any;
  selectedRules: string[] = [];

  updateSelectedRules() {
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
    this.commondata.GetAllRules().subscribe((res: any) => {
      this.subRules = res.map((rule:any) => ({ ...rule, isSelected: false }));
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
    Validators.maxLength(25)]),
    description: new FormControl('', [Validators.required]),
    businesshours: new FormControl('', [Validators.required]),
    SlaPolicy: new FormControl('', [Validators.required]),
    skillRules: new FormControl('', [Validators.required]),
    skillTags: new FormControl([]) 

    
  })

  ngOnInit() {

    this.getParentTagsList()
    this.getallbusinessHours()
    this.getAllSlaPolicies()
    this.getSkillsById()
    // this.getAllkeyword()
    this.GetRules()


  }
  getresponseId: any[] = []

  getSkillsById() {
    this.id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    this.commondata.editSkill(this.id).subscribe((res: any) => {
      console.log("the Edit Data===>", res);
      this.getresponseId = res.skillTags
      this.getresponseId?.forEach((item: any) => {
        console.log("this  tagId===>", item.tagId)
        if (item.tagId) {
          this.isChecked = true
        }

      });

      this.userForm.patchValue({

        "teamname": res.name,
        "description": res.descreption,
        "businesshours": res.businessHoursId,
        "SlaPolicy": res.slaPolicyId,
        "skillRules":res.skillRules,
        "skillTags":res.skillTags,
        

      });
    });
  }
  onSubmit() {
    let data = {
       "id": this.id,
      "name": this.userForm.value.teamname,
      "descreption": this.userForm.value.description,
      "businessHourId": Number(this.userForm.value.businesshours),
      "slaPolicyId": Number(this.userForm.value.SlaPolicy),
      "skillTags": this.isSelectedTagsId.map(item => (typeof item === 'object' ? item.tagId : item)).join(','), 
      "skillRules": this.subRules.filter(rule => rule.isSelected).map(rule => rule.id).join(',') 
    }
    if (this.id && this.id !== null) {
      this.commondata.UpdateSkill(this.id, data).subscribe((res: any) => {
        console.log("Update skills===>", res)
        this.router.navigateByUrl('/console/skills');
        this.sendtoastervalue = "updateSkill"
      })
    }
    else {
      console.log("this.userForm.value===>", data);
      this.commondata.AddSkill(data).subscribe((res: any) => {
        console.log("addSkills===>", res)
        this.sendtoastervalue = 'skilladd'
      })
      this.userForm.reset()
      this.router.navigateByUrl('/console/skills')
    }

  }

  AddTeamMembers() {
    this.isActive = !this.isActive;
  }// get all business Hours
  getallbusinessHours() {
    this.commondata.GetBusinessHours().subscribe((res: any) => {
      this.isBusnisshours = res
      console.log("All business hours===>", res)
    })
  }
  // get all Sla Policies
  getAllSlaPolicies() {
    this.commondata.GetSlaPolicy().subscribe((res: any) => {
      this.isSlaPolicies = res
      console.log("this.isSlaPolices==>", this.isSlaPolicies)
    })
  }

  getParentTagsList() {
    
    this.commondata.GetTagsByCompanyId().subscribe((res: any) => {
      this.TagsLists = res
      console.log("this.tagsLsiting===>", this.TagsList)
    })
  }

  getChildtagsbyId(id: any) {
    let data = {
      "id": 0,
      "parentId": id,
      "baseId": 0
    }
    this.commondata.GetTagById(data).subscribe((res: any) => {
      this.childtags = res
      console.log("Childs of parents==>", res)
    })
  }

  getSubChildTagbtId(id: any) {
    let data = {
      "id": 0,
      "parentId": id,
      "baseId": 0
    }
    this.commondata.GetTagById(data).subscribe((res: any) => {
      this.subChildTags = res
      console.log("Sub child tags==>", res)
    })
  }


  toggleDropdown(tagName: string) {
    
    this.showDropdownState[tagName] = !this.showDropdownState[tagName];
  }

  toggleSelectionTags(id: any) {
    
    const index = this.selectedIds.findIndex((x) => x == id)
    if (index >= 0) {
      this.isSelectedTagsId.splice(index, 1)
    }
    else {
      this.isSelectedTagsId.push(id)
    }
    console.log("this.SingelSelectedValue===>", this.isSelectedTagsId)
  }

  keywordIds: any
  selectedParent(tag: any) {
    
    let obj = {
      "tagId": tag.parentId
    }
  
    tag.isChecked = !tag.isChecked;
  
    if (tag.isChecked) {
      this.isSelectedTagsId.push(obj)
    } else {
      const index = this.isSelectedTagsId.findIndex((item) => item.tagId === tag.id);
      if (index !== -1) {
        this.isSelectedTagsId.splice(index, 1);
      }
  
      tag.subTags.forEach((childTag: any) => {
        const childIndex = this.isSelectedTagsId.findIndex((item) => item.tagId === childTag.id);
        if (childIndex !== -1) {
          this.isSelectedTagsId.splice(childIndex, 1);
        }
      });
    }
  }
  

  isSelectedTag(tagId: number): boolean {
    return this.isSelectedTagsId.includes(tagId);
  }



  selectedfastChild(tag: any) {
    let obj = {
      "tagId": tag.id
    }

    ;
    tag.isChecked = !tag.isChecked;
    if (tag.isChecked) {
      this.isSelectedTagsId.push(obj)

    } else {
      this.subChildTags.forEach((item: any) => {
        const index = this.isSelectedTagsId.indexOf(item.id);
        if (index !== -1) {
          this.isSelectedTagsId.splice(index, 1);
        }
      });
    }
    console.log("this.selectedIds===>", this.isSelectedTagsId);
  }
  getAssignmentByid(evt: any) {

  }


  isSelected(id: number) {
    return this.selectedIds.indexOf(id) >= 0
  }
  toggleselection(id: number) {
    const index = this.selectedIds.findIndex((x) => x == id)
    if (index >= 0) {
      this.selectedIds.splice(index, 1)
    }
    else {
      this.selectedIds.push(id)
    }
    if (this.selectedIds.length >= 0) {
      this.showIcon = true
      this.isChecked = false

    }
    else {
      this.showIcon = false
      this.allselected = false
      this.selectedIds = []
    }
  }
  
  Ids: any[] = []
  isCheckedAll = false;
  masterSelected = false;
  isDescendingOrder: boolean = false
  routerLink() {
    this.router.navigateByUrl('/console/skills')
  }
 






}