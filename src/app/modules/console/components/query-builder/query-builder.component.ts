import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QueryBuilderModule } from 'angular2-query-builder';

@Component({
  selector: 'app-query-builder',
  standalone: true,
  imports: [RouterModule, CommonModule, QueryBuilderModule, FormsModule, ReactiveFormsModule  ],
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.scss']
})
export class QueryBuilderComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  

  @Input() group: any;

  operators = [
    { name: 'AND' },
    { name: 'OR' }
  ];

  fields = [
    { name: 'Firstname' },
    { name: 'Lastname' },
    { name: 'Birthdate' },
    { name: 'City' },
    { name: 'Country' }
  ];

  conditions = [
    { name: '=' },
    { name: '<>' },
    { name: '<' },
    { name: '<=' },
    { name: '>' },
    { name: '>=' }
  ];
  getSortedRules(): any[] {
    return this.group.rules.sort((a: { index: number; }, b: { index: number; }) => a.index - b.index);
  }
  addCondition() {
    this.group.rules.push({
      condition: '=',
      field: 'Firstname',
      data: ''
    });
  }

  removeCondition(index: number) {
    this.group.rules.splice(index, 1);
  }

  addGroup() {
    this.group.rules.push({
      group: {
        operator: 'AND',
        rules: []
      }
    });
  }

  removeGroup() {
    if ("group" in this.group) {
      const parentGroup = this.group as any;
      parentGroup.rules.splice(parentGroup.rules.indexOf(this.group), 1);
    }
  }
}