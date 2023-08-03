import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'app-rules',
  standalone:true,
  imports:[CommonModule, RouterModule],
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
  tableData = [{ name: '', description: '', rulesJson:''},];

  constructor( private headerService : HeaderService , private commonService : CommonDataService , private router : Router) { }

  ngOnInit(): void {
    this.commonService.GetAllRules()
    .subscribe((response: any) => {
      this.tableData = response; // Assign the response to the tableData array
      console.log(this.tableData); // Verify that the data is populated correctly
    }, (error: any) => {
      console.error(error);
    });
  }
  updatevalue(string:any){
    this.headerService.updateMessage(string);
  }
  editTemplate(message: any) {
    this.router.navigate(['/console/add-rules'], {
      state: { message }
    });
  }

  deleteTemplate(message: any) {
    // const confirmation = confirm('Are you sure you want to delete this template?');
    // if (confirmation) {
    //   this.commonService.DeleteSlaPolicy(message.id).subscribe(
    //     () => {
    //       // Success callback
    //       console.log('message deleted:', message);
    //       // Remove the deleted message from the messages array
    //       this.tableData = this.tableData.filter((msg) => msg.id !== message.id);
    //     },
    //     (error: any) => {
    //       // Error callback
    //       console.error('Error deleting template:', error);
    //     }
    //   );
    // }
  }

  disableTemplate(message: any) {
    // Logic for disabling the template goes here
    console.log('Disabling template:', message);
  }

  cloneTemplate(message: any) {
  }
 
}
