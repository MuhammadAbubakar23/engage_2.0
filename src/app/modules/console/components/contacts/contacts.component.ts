import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
@Component({
  standalone:true,
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  imports:[FormsModule,ReactiveFormsModule,CommonModule,LayoutsModule]
})
export class ConsoleContactsComponent implements OnInit {
  contanctArray:any[]=[]
searchName:any
currentPage: number = 1;
itemsPerPage: number = 10;

totalCounts:any;
  constructor(private headerService: HeaderService,
    private commanService:CommonDataService) { }

  ngOnInit(): void {
    this.getAllContacts()
  }
getAllContacts(){
  debugger
  let obj={
    "fromDate": null,
    "toDate": null,
    "user": "",
    "pageId": "",
    "plateForm": "",
    "pageNumber": this.currentPage,
    "pageSize": this.itemsPerPage,
    "isAttachment": false,
    "queryType": "",
    "text": "",
    "include": "",
    "userName": this.searchName,
    "notInclude": "",
    "flag": ""
}
  this.commanService.GetCustomers(obj).subscribe((res:any)=>{
    this.contanctArray=res
    this.totalCounts=res.length
  })
}
filltername(){
  debugger
  if(this.searchName.length>=2){
    this.getAllContacts()
  }
  if(this.searchName.length==0){
    this.getAllContacts()
  }
 
}
  updatevalue(string:any){
    this.headerService.updateMessage(string);
  }

  setPerPage(evt:any){
this.itemsPerPage=evt
this.currentPage=1
this.getAllContacts()
 
  }
  previousPage(){

  }
  getVisiblePageNumbers(){
    
    const maxPages = Math.ceil(this.totalCounts / this.itemsPerPage);
    const visiblePages = 5;

    let startPage = Math.max(1, this.currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(startPage + visiblePages - 1, maxPages);

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }
  
  goToPage(evt:any){
    debugger
    if (evt >= 1 && evt <= Math.ceil(this.totalCounts / this.itemsPerPage)) {
      this.currentPage = evt;
    }
  this.getAllContacts()
  }
  nextPage(){

  }
}
