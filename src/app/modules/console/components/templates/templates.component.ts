import { Component, OnInit } from '@angular/core';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutsModule } from 'src/app/layouts/layouts.module';

@Component({
  selector: 'app-templates',
  // standalone: true,
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
  // imports: [RouterModule, CommonModule , MessagesComponent, LayoutsModule ]
})
export class TemplatesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
