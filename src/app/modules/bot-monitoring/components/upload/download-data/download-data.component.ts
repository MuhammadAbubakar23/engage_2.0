import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-download-data',
  templateUrl: './download-data.component.html',
  styleUrls: ['./download-data.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class DownloadDataComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
