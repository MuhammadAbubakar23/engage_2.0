import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
  tableData = [{ name: '', description: '', rulesJson: '' },];
  searchText: string = '';
  applySearchFilter() {
    const searchTextLower = this.searchText.toLowerCase();
    this.tableData = this.tableData.filter((message) => {
      const templateNameLower = (message.name || '').toLowerCase();
      return templateNameLower.includes(searchTextLower) || templateNameLower.includes(searchTextLower)
    });
  }
  refreshtableData() {
    this.commonService.GetAllRules().subscribe(
      (response: any) => {
        this.tableData = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  constructor(private headerService: HeaderService, private commonService: CommonDataService, private router: Router) { }
  ngOnInit(): void {
    this.commonService.GetAllRules()
      .subscribe((response: any) => {
        this.tableData = response;
        console.log(this.tableData);
      }, (error: any) => {
        console.error(error);
      });
  }
  updatevalue(string: any) {
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
    //   this.commonService.DeleteRules(message.id).subscribe(
    //     () => {
    //       console.log('message deleted:', message);
    //       // Remove the deleted message from the messages array
    //       this.tableData = this.tableData.filter((msg) => msg.id !== message.id);
    //     },
    //     (error: any) => {
    //       console.error('Error deleting template:', error);
    //     }
    //   );
    // }
  }
  disableTemplate(message: any) {
    console.log('Disabling template:', message);
  }
  cloneTemplate(message: any) {
  }
}
