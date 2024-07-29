import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
// import { HeaderService } from 'src/app/shared/services/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { NgxSpinnerModule, } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { PermissionService } from 'src/app/shared/services/permission.service';
interface Tag {
  color: any;
  mainId: any;
  id: any;
  name: string;
  tickets: number;
  contacts: number;
  isActive:boolean,
  isBlock:boolean,
}
@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NgxSpinnerModule],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  status: string = 'All';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  tags: Tag[] = [];
  selectedSortOption:string=''
  perPage: number = 10;
  totoalCount: any
  totalItems: number = 100;
  sortby: any
  searchText: string = '';
  selectedTextColor = ' #FF0000';
  hasCreatePermission: boolean=false;
  hasupdatePermission: boolean=false;
  hasDeletePermission: boolean=false;
  delobj = {"id": 0,"isActive": true,"isBlock": true};

  applySearchFilter(): void {
    if (this.searchText.length > 2) {
      this.getTags()
    }
    if (this.searchText.length == 0) {
      this.getTags()
    }
  }
  constructor(private headerService: HeaderService, private spinnerServerice: NgxSpinnerService,
    private commonService: CommonDataService, private router: Router, private _perS:PermissionService) { }

hasPermission(permissionName: string) {

    const isAccessible = this._perS.hasPermission(permissionName)
    return isAccessible
  }
  ngOnInit(): void {
    this.hasCreatePermission = this.hasPermission('_nwtg_');
    this.hasupdatePermission = this.hasPermission('_uptg_');
    this.hasDeletePermission = this.hasPermission('_rmvtg_');
    this.getTags();
    // this.GetAllTags()
  }
  // getTags(): void {
  //   this.spinnerServerice.show()
  //   this.tags=[]
  //   this.commonService.GetTags()
  //     .subscribe((response: any) => {
  //       this.spinnerServerice.hide()
  //  const tags = response; // Assign the response to the messages array
  //  tags.forEach((abc:any)=>{
  //   if(abc.name=='Tags'){
  //    abc.subTags.forEach((x:any)=>{
  //    x.subTags.forEach((abc:any)=>{
  //     if( !this.tags.includes(abc)){
  //       this.tags.push(abc)
  //     }
  //    })
  //    })
  //   }
  //  })
  //     }, (error: any) => {
  //       this.spinnerServerice.hide()
  //       console.error(error);
  //     });
  // }
  getTags() {
    let obj = {
      "search": this.searchText,
      "sorting": this.selectedSortOption,
      "pageNumber": this.currentPage,
      "pageSize": this.perPage
    }
    this.spinnerServerice.show()
    this.commonService.GetAllTag(obj).subscribe((res: any) => {
      this.spinnerServerice.hide()
      this.tags = res.Tags
      this.totoalCount = res.TotalCount
    }, error => {
      this.spinnerServerice.hide()
    }
    )
  }
  sortTags(item: any): void {
    this.sortby = item.target.text.toLowerCase()
    this.getTags()
  }
  updatevalue(string: any) {
    this.headerService.updateMessage(string);
  }
  editTag(tag: Tag): void {
    // this.router.navigate(['/console/tag/create/0'], {
    //   state: { tag }
    // })
    this.router.navigate(['/console/tag/create/', tag.mainId])
  }
  deleteTemplate(message: any,isDelete:any) {
    const confirmation = confirm(isDelete == true ? 'Are you sure you want to delete this template?' : 'Are you sure you want to change the status?');

    if (confirmation) {
    this.delobj.id = message.mainId;
    this.delobj.isActive = !message.isActive;
    this.delobj.isBlock = isDelete;
    this.commonService.DeleteTags(this.delobj).subscribe((res: any) => {
      this.getTags()
    })
    }
  }

  disableTag(tag: Tag): void {
  }
  cloneTag(tag: Tag): void {
    const cloneTag = { ...tag };
    cloneTag.name += ' (Cloned)';
    this.tags.push(cloneTag);
  }
  setPerPage(perPage: number): void {
    this.perPage = perPage;
    this.currentPage = 1;
    this.getTags()
  }
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    this.getTags()
  }
  nextPage(): void {
    const maxPages = Math.ceil(this.totoalCount / this.perPage);
    if (this.currentPage < maxPages) {
      this.currentPage++;
    }
    this.getTags()
  }
  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(this.totoalCount / this.perPage)) {
      this.currentPage = pageNumber;
    }
    this.getTags()
  }
  getVisiblePageNumbers(): number[] {
    const maxPages = Math.ceil(this.totoalCount / this.perPage);
    const visiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(startPage + visiblePages - 1, maxPages);
    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
 
  }
  setSortOption(option: string) {
    this.selectedSortOption = option;
   this.getTags()
  }
}
