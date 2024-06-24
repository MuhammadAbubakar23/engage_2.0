import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { LoginComponent } from '../login/login.component';
import { ActorsInfoService } from '../Services/actorsInfoService/actors-info.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss'],
})
export class ActorsComponent implements OnInit {
  fullName: string = '';
  email: string = '';
  imagename: string = '';
  actors: any[] = [];

  constructor(
    private storage: StorageService,
    private commonService: CommonDataService,
    private getActors: ActorsInfoService,
    private router: Router,
    private actorService: ActorsInfoService
  ) {}

  ngOnInit(): void {
    let data = this.storage.retrive('main', 'O').local;
    this.fullName = data.username;
    console.table(data);
    this.email = data.originalUserName;

    this.actors = data.actors;
  }

  openInterface(actorId: number) {
  this.actorService.sendActors(actorId)
    // switch (actor) {
    //   case 'administrator':
    //     this.router.navigateByUrl('all-inboxes/focused/all');
    //     break;

    //   case 'supervisor':
    //     this.router.navigateByUrl('all-inboxes/focused/all');
    //     break;

    //   case 'agent':
    //     this.router.navigateByUrl('all-inboxes/focused/all');
    //     break;

    //   default:
    //     this.router.navigateByUrl('all-inboxes/focused/all');
    //     break;
    // }
  }
}
