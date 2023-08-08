import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
// import { MenuModel } from '../../menu-state/menu.model';
// import { CardBoxListNodeComponent } from '../card-box-list-node/card-box-list-node.component';

@Component({
  selector: 'engage2-card-box-list-checkbox',
  // standalone: true,
  // imports: [CommonModule, CardBoxListNodeComponent],
  templateUrl: './card-box-list-checkbox.component.html',
  styleUrls: ['./card-box-list-checkbox.component.scss']
})
export class CardBoxListCheckboxComponent implements OnInit {
  //@Input() menu?: any; //; //Observable<T>
  //@Input() addParent:boolean = false;
  @Input() checkboxListHeader?:string;
  @Input() checkboxListName?:string;
  @Input() checkboxListCheck:Array<any> = [];
  @Output() menuChecked:EventEmitter<any> = new EventEmitter<any>();
  checkboxListMaster: boolean = false;
  checkboxListChecked:any = {name: "", data:[]};
  
  // @Input() mainmenu?:string;
  // boxListForm?: FormGroup;  
  // boxListMaster:boolean;
  // checkboxListForm : FormGroup | undefined;
  // ({
  //   submenulist: new FormArray(),
  //   selectAll: new UntypedFormControl()    
  // });
  constructor(private fb: FormBuilder) {  }
  ngOnInit(): void {
    //this.menu?.append(...this.menu?.subMenu);
    //this.menu.name = "Access"; 
    //this.checkboxListCheck = this.menu.subMenu;
    // if(this.addParent){      
      
    //   this.checkboxListCheck.push(this.menu);
    // }
    // let a = this.menu;
    // a.name = "Access"
    // console.log(this.checkboxListCheck);
    this.isAllSelected();
  }
  checkUncheckAll() {
    for (var i = 0; i < this.checkboxListCheck.length; i++) {
      this.checkboxListCheck[i].isSelected = this.checkboxListMaster;
    }
    this.getCheckedItemList();
  }
  isAllSelected() {
    this.checkboxListMaster = this.checkboxListCheck.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }
 
  getCheckedItemList(){
    this.checkboxListChecked = {name: this.checkboxListName, data:[]};
    for (var i = 0; i < this.checkboxListCheck.length; i++) {
      if(this.checkboxListCheck[i].isSelected)
        this.checkboxListChecked.data.push(this.checkboxListCheck[i]);
    }
    this.menuChecked.emit(this.checkboxListChecked);
    // this.menuChecked = JSON.stringify(this.checkboxListChecked);
  }
  // ngOnInit(): void {    
    // //FormControl<boolean | null>[] | undefined; //
    // const formControls =  this.menu.?subMenu?.map(control => new FormControl(false));//<boolean| null |undefined>
    // // Create a FormControl for the select/unselect all checkbox
    // const selectAllControl = new FormControl(false);
    // // Simply add the list of FormControls to the FormGroup as a FormArray, add the selectAllControl separetely
    // this.boxListForm = this.fb.group({
    //   submenulist: new FormArray(formControls),
    //   selectAll: selectAllControl
    // });
    // this.onChanges();
  // }
  // onChanges(): void {
  //   //this.boxListForm.get(this.submenulist)?.valueChanges
  //   // Subscribe to changes on the selectAll checkbox
  //   this.boxListForm.get('selectAll')?.valueChanges.subscribe(bool => {
  //     this.boxListForm.get('submenulist')?.patchValue(Array(this.submenulist.length).fill(bool), { emitEvent: false });
  //   });

  //   // Subscribe to changes on the music preference checkboxes
  //   this.boxListForm.get('submenulist')?.valueChanges.subscribe(val => {
  //     const allSelected = val.every(bool => bool);
  //     if (this.boxListForm.get('selectAll')?.value !== allSelected) {
  //       this.boxListForm.get('selectAll')?.patchValue(allSelected, { emitEvent: false });
  //     }
  //   });
  // }

  // submit() {
  //   // Filter out the unselected ids
  //   const selectedPreferences = this.boxListForm?.value.submenulist
  //     .map((checked, index) => checked ? this.submenulist[index].id : null)
  //     .filter(value => value !== null);
  //   // Do something with the result
  // }
}
