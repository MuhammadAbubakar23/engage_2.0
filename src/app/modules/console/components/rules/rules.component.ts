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
    if(this.searchText.trim() !== ''){
      this.refreshtableData()
    }
    else{
      this.searchText = '';
      this.refreshtableData()
    }
  }

  refreshtableData() {
    const data ={
      search: this.searchText,
      sorting: this.selectedSortOption,
      pageNumber: 0,
      pageSize: 0
    }

    this.commonService.GetAllRules(data).subscribe(
      (response: any) => {
        this.tableData = response.Rules;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  selectedSortOption: any;

  setSortOption(option: string) {
    
    this.selectedSortOption = option;
    this.refreshtableData(); 
  }
  constructor(private headerService: HeaderService, private commonService: CommonDataService, private router: Router) { }
  ngOnInit(): void {
   this.refreshtableData()
  }
  updatevalue(string: any) {
    this.headerService.updateMessage(string);
  }
  editTemplate(message: any) {
    
    this.router.navigate(['/console/add-rules',message.id])
  }
  canEditOrDelete(row: any): boolean {
    // Add your condition here, for example:
    return row.companyId !== 0;
  }
  
  deleteTemplate(message: any) {
    const confirmation = confirm('Are you sure you want to delete this template?');
    if (confirmation) {
      this.commonService.DeleteRules(message.id).subscribe(
        () => {
          console.log('message deleted:', message);
          this.tableData = this.tableData.filter((msg: any) => msg.id !== message.id);

        },
        (error: any) => {
          console.error('Error deleting template:', error);
        }
      );
    }
  }
  disableTemplate(message: any) {
    console.log('Disabling template:', message);
  }
  cloneTemplate(message: any) {
  }
}
