import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-connect-form',
  templateUrl: './connect-form.component.html',
  styleUrls: ['./connect-form.component.scss']
})
export class ConnectFormComponent implements OnInit {


  connectForm : UntypedFormGroup = new UntypedFormGroup({
    firstname : new UntypedFormControl(),
    lastname : new UntypedFormControl(),
    flexSwitchCheckDefault : new UntypedFormControl(),
    phone : new UntypedFormControl(),
    email : new UntypedFormControl(),
    timezone : new UntypedFormControl(),
    team : new UntypedFormControl(),
    supportchannel : new UntypedFormControl(),
    language : new UntypedFormControl(),
    roles : new UntypedFormControl(),
  });
  submitted = false;
  
  constructor(private formbuilder : UntypedFormBuilder) { }

  ngOnInit() : void {

    this.connectForm = this.formbuilder.group({
      name: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      websiteurl: ['',[Validators.required]],
      numberofseats: ['',[Validators.required]],
      status: ['', [Validators.required]],
      business: ['', [Validators.required]],
      information: ['', [Validators.required]],
    })
   
  }

  
  onSubmit() : void {
    // console.log(this.connectForm.value);
  }

  isShow=false;
  isActive=false;

  ManageSkills(){
    this.isShow=!this.isShow;
  }

  ManageSkillsSwitch(){
    this.isActive=!this.isActive;
  }

  SupportChannelsControl = new UntypedFormControl(null, Validators.required);
  SupportChannels: string[] = ['Corporate Teams','Sales Teams', 'Add channels'];

  LanguagesControl = new UntypedFormControl(null, Validators.required);
  Languages: string[] = ['English', 'Urdu'];

  RolesControl = new UntypedFormControl(null, Validators.required);
  Roles: string[] = ['Agent', 'Accounts','Sales'];

  SkillsControl = new UntypedFormControl(null, Validators.required);
  Skills: string[] = ['English', 'Urdu'];
  /**
   * Write code on Method
   *
   * method logical code
   */
  onCatRemovedSupportChannel(cat: string) {
    const SupportChannels = this.SupportChannelsControl.value as string[];
    this.removeFirst(SupportChannels, cat);
    this.SupportChannelsControl.setValue(SupportChannels); // To trigger change detection
  }

  onCatRemovedLanguage(cat: string) {
    const Languages = this.LanguagesControl.value as string[];
    this.removeFirst(Languages, cat);
    this.LanguagesControl.setValue(Languages); // To trigger change detection
  }
  onCatRemovedRole(cat: string) {
    const Roles = this.RolesControl.value as string[];
    this.removeFirst(Roles, cat);
    this.RolesControl.setValue(Roles); // To trigger change detection
  }
  onCatRemovedSkill(cat: string) {
    const Skills = this.SkillsControl.value as string[];
    this.removeFirst(Skills, cat);
    this.SkillsControl.setValue(Skills); // To trigger change detection
  }
  /**
   * Write code on Method
   *
   * method logical code
   */
  
  
  private removeFirst(array: any[], toRemove: any): void {

    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}
