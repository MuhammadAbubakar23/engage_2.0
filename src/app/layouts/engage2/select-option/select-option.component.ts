import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss']
})
export class SelectOptionComponent implements OnInit {
  opt:any =[];
  options:any =[];
  selected:number=0; 
  selectedTeam:any;
 
  //appTeamForm?:FormGroup;

  constructor(private storeSrv:StorageService,public formBuild: FormBuilder) { }
 
  ngOnInit(): void {
    let main = this.storeSrv.retrive("main","o").local;
    let selectedRole = this.storeSrv.retrive("nocompass","O").local;    
    this.selected = selectedRole.id;
    this.opt = main.roles;
  }
  onTeamSelect(e:any){
    let a = this.opt.find((item:any) => item?.id == e.target.value);
    this.storeSrv.store("nocompass",a);
    window.location.reload();   
  }
}
