import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss']
})
export class SelectOptionComponent implements OnInit {
  opt:Array<any> =[];
  selected:number=0; 
  //selectedTeam:any;

  constructor(private storsrv:StorageService,public formBuild: FormBuilder) { }
 
  ngOnInit(): void {
    let main = this.storsrv.retrive("main","o").local;
    let selectedRole = this.storsrv.retrive("nocompass","O").local;
    console.log(selectedRole);
    this.selected = selectedRole.id;
    
    this.opt = main.roles;
    console.log(this.opt);
    // vr.roles.forEach((currentElement:any, index:any, array:[]) => {
    //       let newName = { 
    //         id:currentElement.id, 
    //         slug:currentElement.name.replace(/\s/g, ''), 
    //         name:currentElement.name
    //       }  
    //       // console.log(newName);
    //       // if(index==0){
    //       //   this.storsrv.store("nocompass",newName);
    //       // }
    //       this.opt.push(newName);
    //     });    
  }

  onTeamSelect(selectedTeam:any){
    console.log(selectedTeam);
    let a = this.opt.find((item:any) => item?.id == selectedTeam);
    this.storsrv.store("nocompass",a);
  }

}
