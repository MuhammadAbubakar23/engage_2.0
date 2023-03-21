import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-enteract-route',
  standalone:true,
  imports:[CommonModule, RouterModule],
  templateUrl: './enteract-route.component.html',
  styleUrls: ['./enteract-route.component.scss']
})
export class EnteractRouteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
