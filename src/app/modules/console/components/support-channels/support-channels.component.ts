import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-support-channels',
  standalone:true,
  imports:[CommonModule, RouterModule],
  templateUrl: './support-channels.component.html',
  styleUrls: ['./support-channels.component.scss']
})
export class SupportChannelsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
