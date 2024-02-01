import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataExchangeServicesService } from 'src/app/services/dataExchangeServices/data-exchange-services.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],//, CreateTeamComponent
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  search: any = ''
  fillter: any = ""
  selectedIds: any[] = [];
  isChecked: boolean = false
  showIcon: boolean = false
  allSelected: boolean = false
  Page: any = 1
  sort: any = ''
  endingPoint: any;
  startingPoint: any;
  TotalCount: any = [];
  itemsPerPage = 7;
  itemperpage: any = 7;
  isSelectedDepartment: any = '';
  toastermessage: boolean = false
  isDepartmentArray: any[] = [];
  // id: any = ''
  constructor(private headerService: HeaderService,
    private dataExChange: DataExchangeServicesService,
    private activeRoute: ActivatedRoute,
    private commonData: CommonDataService,
    private route: Router) { }

  ngOnInit(): void {
    this.getSkillList()
    // Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));
    this.skills.forEach((x) => {
      this.isSelectedDepartment = x.department

      this.isDepartmentArray.push(this.isSelectedDepartment)
    });



  }
  updatevalue(string: any) {

    this.headerService.updateMessage(string);
  }
  getSkillList() {
    let obj = {

      search: this.search,
      sorting: "",
      pageNumber: this.pageNumber,
      pageSize: this.itemsPerPage,

    }
    this.commonData.GetSkill(obj).subscribe((res: any) => {
      this.skills = res.Skills
      this.TotalCount = res.TotalCount;
      if (this.pageNumber == 1) {
        this.startingPoint = 1;
      } else {
        this.startingPoint = (this.pageNumber - 1) * this.itemsPerPage + 1;
      }
      this.totalPages = Math.ceil(this.TotalCount / this.itemsPerPage);
      if (this.TotalCount <= this.startingPoint + this.itemsPerPage - 1) {
        this.endingPoint = this.TotalCount;
      } else {
        this.endingPoint = this.startingPoint + this.itemsPerPage - 1;
      }
      console.log(res)
    })
  }
  skills: any[] = [];

  // skills: any[] = [

  //   { id: 1, teams: "vw", userid: 333, department: "Information technology" },
  //   { id: 2, teams: "special Projects", userid: 3434, department: "Sales" },
  //   { id: 3, teams: "Corporte Team", userid: 3422, department: "Account,Support" },
  //   { id: 4, teams: "lead Management", userid: 9988, department: "All" },
  //   { id: 5, teams: "PK Sport", userid: 9988, department: "All" },
  //   { id: 6, teams: "HR Management", userid: 9988, department: "All" },
  //   { id: 7, teams: "IT Managment", userid: 9908, department: "IT Managemnet" },

  // ]
  isSelected(id: number) {
    return this.selectedIds.indexOf(id) >= 0;
  }
  toggleSelection(id: number) {
    const index = this.selectedIds.findIndex((x) => x == id);
    if (index >= 0) {
      this.selectedIds.splice(index, 1)
    } else {
      this.selectedIds.push(id)
    }
    if (this.selectedIds.length >= 0) {
      this.showIcon = true
      this.allSelected = true
      this.isChecked = false
    }
    else {
      this.showIcon = false
      this.selectedIds = [];
      this.allSelected = false
    }

    if (this.selectedIds.length == this.itemperpage) {
      this.isChecked = true
      this.refresh()
    }
  }

  isSectedAll() {
    console.log("isSectedAll() called");
    this.allSelected = !this.allSelected;
    this.isChecked = !this.isChecked;
    console.log("allSelected:", this.allSelected);
    console.log("isChecked:", this.isChecked);
    if (this.isChecked) {
      this.selectedIds = this.skills.map(item => item.id);
    }
    else {
      this.selectedIds = [];
    }
    console.log("Selected All===>", this.selectedIds)
    if (this.selectedIds.length > 0) {
      this.showIcon = true
    }
    else {
      this.showIcon = false
    }
  }
  refresh() {
    this.showIcon = false,
      this.allSelected = false
    this.isChecked = false
    this.selectedIds = [];
  }
  isDecsendingorder: boolean = false

  isDeccsendingsort: string = ''

  sortedBy(data: string) {

    this.isDecsendingorder = !this.isDecsendingorder
    this.skills.sort((a: any, b: any) => {
      if (a[data] < b[data]) {

        return this.isDecsendingorder ? 1 : -1;
      }
      if (a[data] > b[data]) {

        return this.isDecsendingorder ? -1 : 1;
      }
      return 0
    })
  }
  deleted(id: number) {
    
    this.selectedIds.push(id)

    this.commonData.DeleteSkill(this.selectedIds).subscribe(
      (res: any) => {
        this.skills = this.skills.filter((x) => x.id !== id);
      },
      (error: any) => {
        console.error('Delete error:', error);
      }
    );

    this.toastermessage = true;

    setTimeout(() => {
      this.toastermessage = false;
    }, 2000);
  }


  checkout: any = ''
  totalPages: any;
  pageNumber = 1;
  getByDepartment(event: any) {
    this.fillter = event.target.value
  }
  getbySearch() {
    if (this.search.length >= 2) {
      this.getSkillList();
    } else {
      this.search = '';
      this.getSkillList();
    }
  }

  closeToaster() {
    this.toastermessage = false
  }
  sortedValue(event: any) {
    this.sort = event.target.innerHTML;
  }
  nextPage(pageNumber: any) {
    let page = pageNumber + 1;
    if (page < this.totalPages + 1) {
      this.pageNumber = page;
      this.getSkillList()
    }
  }
  prevPage(pageNumber: any) {
    if (pageNumber >= 1) {
      let page = pageNumber - 1;
      if (page > 0) {
        this.pageNumber = page;
      }
    }
    this.getSkillList()
  }
  totaluser: string = '';
  tottalDepartment: string = ''
  username: string = '';

  handOnclick(name: any, totaluser: any, dep: any) {
    let data = {
      "TeamNAme": this.username = name,
      "tottalusers": this.totaluser = totaluser,
      "Department": this.tottalDepartment = dep
    }

    console.log("Send Data ==>", data)
    this.dataExChange.sendData(data)
  }
  editUser(id: any) {
    this.route.navigateByUrl(`/console/skills/create/${id}`);
    console.log('After navigation', id);
  }
}
