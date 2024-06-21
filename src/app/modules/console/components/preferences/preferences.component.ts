import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  standalone:true,
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
  imports:[CommonModule , RouterModule]
})
export class PreferencesComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }
}
