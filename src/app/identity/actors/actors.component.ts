import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss']
})
export class ActorsComponent implements OnInit {

  fullName: string = '';
  email: string = '';
  imagename: string='';

  constructor(
    private storage: StorageService) { }

  ngOnInit(): void {
    let data = this.storage.retrive('main', 'O').local;
    this.fullName = data.username;
    console.table(data);
    this.email = data.originalUserName;
    debugger;
  }

}
