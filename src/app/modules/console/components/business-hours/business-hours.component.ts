import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-business-hours',
  standalone:true,
  imports:[CommonModule, RouterModule],
  templateUrl: './business-hours.component.html',
  styleUrls: ['./business-hours.component.scss']
})
export class BusinessHoursComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
