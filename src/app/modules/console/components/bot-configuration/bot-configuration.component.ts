import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'app-bot-configuration',
  templateUrl: './bot-configuration.component.html',
  styleUrls: ['./bot-configuration.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule , NgxSpinnerModule],
})
export class BotConfigurationComponent implements OnInit {
  bots = [
    { name: 'Bot 1', active: false },
    { name: 'Bot 2', active: true },
    { name: 'Bot 3', active: true },
    { name: 'Bot 4', active: true },
    { name: 'Bot 5', active: false },
    { name: 'Bot 6', active: true },
    { name: 'Bot 7', active: true },
    { name: 'Bot 8', active: true },
    { name: 'Bot 9', active: false },
    { name: 'Bot 10', active: true },
    { name: 'Bot 11', active: true },
    { name: 'Bot 12', active: true },
    { name: 'Bot 13', active: false },
    { name: 'Bot 14', active: true },
    { name: 'Bot 15', active: true },
    { name: 'Bot 16', active: true },
    { name: 'Bot 17', active: false },
    { name: 'Bot 18', active: true },
    { name: 'Bot 19', active: true },
    { name: 'Bot 20', active: true },
  ];

  botsArray: any[] = [];
  sortOptions: string[] = ['All', 'Ascending', 'Descending'];
  channels: any[] = [];
  selectedSortOption: string = 'All';
  searchText: string = '';
  perPage: number = 5;
  currentPage: number = 1;
  totalCount: any;
  baseUrl: any = 'https://linked.360scrm.com/api/';
  // baseUrl: any = 'https://newpurpleshop86.conveyor.cloud/api/';
  applySearchFilter() {
    if (this.searchText.trim() !== '') {
      this.refreshBots();
    } else {

      this.searchText = '';
      this.refreshBots();
    }

  }


  refreshBots() {
    const formData = {
      search: this.searchText,
      sorting: this.selectedSortOption,
      pageNumber: this.currentPage,
      pageSize: this.perPage,
    }
    this.spinnerServerice.show()
    this.commonService.GetBotConfig( this.baseUrl, formData).subscribe(
      (response: any) => {
        this.spinnerServerice.hide()

        this.botsArray = response.Bot_Config;
        this.totalCount = response.TotalCount

      },
      (error: any) => {
        this.spinnerServerice.hide()

        console.error(error);
      }
    );
  }


  setSortOption(option: string) {
    
    this.selectedSortOption = option;
    this.refreshBots(); 
  }
  constructor(private headerService: HeaderService, private commonService: CommonDataService, private router: Router,
    private spinnerServerice: NgxSpinnerService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.GetFbList();
    this.refreshBots();
    this.getChannels();
  }
  // ngAfterViewChecked(): void{
  //   this.updatevalue(this._route.snapshot.routeConfig?.path);
  // }
  updatevalue(string: any) {
    this.headerService.updateMessage(string);
  }

  GetFbList() {
    const nativeIdentifier = '';
    this.commonService.getAutoRespondFB(nativeIdentifier).subscribe((res: any) => {
      this.bots = res
    })
  }

  viewBot(id: any, type: any) {
    this.router.navigateByUrl(`/console/bot-configuration/${type}/${id}`);
  }



  deleteBot(row: any) {
    const confirmation = confirm('Are you sure you want to delete this Bot?');
    if (confirmation) {
      this.commonService.DeleteBotConfig(row.id, row.pageId, row.contentType).subscribe(
        () => {
          this.botsArray = this.botsArray.filter((bot) => bot.id !== row.pageId);
          this.refreshBots();
        },
        (error: any) => {
          console.error('Error deleting Bot:', error);
          this.refreshBots();
        }
      );
    }
  }

  statusChangeRequest(id:any, status: any, pageId: any, contentType: any){
    this.commonService.UpdateBotStatus(id, pageId, contentType, !status).subscribe(
      (res)=>{
        console.log("success");
        this.refreshBots();
      },
      error=>{
        this.refreshBots();
      } 
    )
    // this.apiService.api(!status).subscribe((res: any)=>{
    //   res.status;
    // })
  }
  setPerPage(perPage: number): void {
    this.perPage = perPage;
    this.currentPage = 1;
    this.refreshBots()
  }
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    this.refreshBots()
  }
  nextPage(): void {
    const maxPages = Math.ceil(this.totalCount / this.perPage);
    if (this.currentPage < maxPages) {
      this.currentPage++;
    }
    this.refreshBots()
  }
  goToPage(pageNumber: number): void {
    
    if (pageNumber >= 1 && pageNumber <= Math.ceil(this.totalCount / this.perPage)) {
      this.currentPage = pageNumber;
    }
    this.refreshBots()
  }

  getVisiblePageNumbers(): number[] {
    const maxPages = Math.ceil(this.totalCount / this.perPage);
    const visiblePages = 5;

    let startPage = Math.max(1, this.currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(startPage + visiblePages - 1, maxPages);

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }
  getChannels(){
    this.commonService.getChannelsList().subscribe((res)=>{
      const response = res as { [key: string]: string };
      
      this.channels = Object.keys(response).map(key => ({
        id: Number(key),
        name: response[key]
      }));
    })
  }
  setChannel(id: any){
    switch(id){
      case(1):
        this.baseUrl = 'https://linked.360scrm.com/api/' 
      break;
      case(2):
      this.baseUrl = 'https://linked.360scrm.com/api/'
      break;
      case(3):
      break;
      case(4):
      break;
      case(5):
      break;
      case(6):
      break;
      case(7):
      break;
      case(8):
      break;
      default:
        this.baseUrl = 'https://linked.360scrm.com/api/'
      break;
    }
  }
}
