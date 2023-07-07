import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
@Component({
  selector: 'app-enteract-route',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './enteract-route.component.html',
  styleUrls: ['./enteract-route.component.scss']
})
export class EnteractRouteComponent implements OnInit {
  messageForm!: FormGroup;
  
  users: any[] = [
    {
      name: 'Waqas Amjad',
      // avatar: 'https://enteract.live/2.0/images/avatar-16.jpg',
      // employeeId: 'EMP-1254894',
      conversationLimit: 10,
    },
    {
      name: 'Nabeel Naseem',
      // avatar: 'https://enteract.live/2.0/images/avatar-2.jpg',
      // employeeId: 'EMP-895894',
      conversationLimit: 10,
    },
    {
      name: 'Ijteba Sultan',
      // avatar: 'https://enteract.live/2.0/images/avatar-3.jpg',
      // employeeId: 'EMP-59894',
      conversationLimit: 10,
    },
  ];
  conversationAssignmentRadios = [
    {
      id: 'firstRadio',
      title: 'Created time',
      description: 'Oldest tickets will be assigned first in the classic first in first out fashion.',
      checked: true
    },
    {
      id: 'secondRadio',
      title: 'Response due by time',
      description: 'Admins and supervisors will manage the agent’s availability from the dashboard.',
      checked: false
    },
    {
      id: 'thirdRadio',
      title: 'Resolution due by time',
      description: 'Tickets that are closest to violate the resolution SLAs will be assigned first.',
      checked: false
    }
  ];
  assignmentModes = [
    {
      id: 'firstRadio1',
      title: 'Round robin assignment',
      description: 'Assign conversation to agents in a circular order.',
      checked: true
    },
    {
      id: 'secondRadio1',
      title: 'Load balanced assignment (Powered by EnteractRoute™)',
      description: 'Distribute and balance the number of tickets assigned to agents in this group, based on channels. Edit the agent’s capping limit in EnteractRoute settings.',
      checked: false
    },
    {
      id: 'thirdRadio1',
      title: 'Skill based assignment - Manage skills',
      description: 'Assign conversation to agents based on their skills.',
      checked: false
    }
  ];
  constructor(private formBuilder: FormBuilder, private commonService : CommonDataService) {
  }
  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      value: [0],
      time: [0],
      lastInsertionDate: ['2023-06-22T12:18:14.884Z'],
      skillId: [0],
      tagId: [0],
    });
    this.getSkills();
  }

  
  getSkills() {
    this.commonService.GetSkill().subscribe(
      (response) => {
        // console.log('GetSkill API response:', response);
        this.users = response as any[]; // Assign the response to the users variable
      },
      (error) => {
        console.error('GetSkill API error:', error);
        // Handle the error as needed
      }
    );
  }
  
  onSubmit() {
    const formData = this.messageForm.value;
    this.commonService.AddEntractRoute(formData).subscribe(
      response => {
        // console.log('API response:', response);
        // Handle the response as needed
      },
      error => {
        console.error('API error:', error);
        // Handle the error as needed
      }
    );
  }
  
  editBtn(template: any) {
    // console.log("button edit", template)
  }
  deleteBtn(template: any) {
    const confirmation = confirm('Are you sure you want to delete this template?');
    if (confirmation) {
      this.commonService.DeleteSkill(template.id).subscribe(
        () => {
          // Success callback
          // console.log('Template deleted:', template);
          // Remove the deleted template from the messages array
          this.users = this.users.filter((msg) => msg.id !== template.id);
        },
        (error: any) => {
          // Error callback
          console.error('Error deleting template:', error);
        }
      );
    }
  }
}
