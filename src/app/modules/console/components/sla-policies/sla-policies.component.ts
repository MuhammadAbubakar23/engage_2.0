import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'app-sla-policies',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sla-policies.component.html',
  styleUrls: ['./sla-policies.component.scss']
})
export class SlaPoliciesComponent implements OnInit {
  messages: any[] = [
    // Assuming you have an array of messages to display
    // Replace this with your actual data
    { id: 1, content: 'This is the first message' },
    { id: 2, content: 'This is the second message' },
    { id: 3, content: 'This is the third message' }
  ];

  constructor(private headerService: HeaderService, private commonService: CommonDataService, private router: Router) { }

  ngOnInit(): void {
    this.commonService.GetSlaPolicy()
    .subscribe((response: any) => {
      this.messages = response; // Assign the response to the messages array
      // console.log(this.messages); // Verify that the data is populated correctly
    }, (error: any) => {
      console.error(error);
    });
  }

  updatevalue(string: any) {
    this.headerService.updateMessage(string);
  }

  editTemplate(message: any) {
    this.router.navigate(['/console/sla-policy/create'], {
      state: { message }
    });
  }

  deleteTemplate(message: any) {
    const confirmation = confirm('Are you sure you want to delete this template?');
    if (confirmation) {
      this.commonService.DeleteSlaPolicy(message.id).subscribe(
        () => {
          // Success callback
          // console.log('message deleted:', message);
          // Remove the deleted message from the messages array
          this.messages = this.messages.filter((msg) => msg.id !== message.id);
        },
        (error: any) => {
          // Error callback
          console.error('Error deleting template:', error);
        }
      );
    }
  }

  disableTemplate(message: any) {
    // Logic for disabling the template goes here
    // console.log('Disabling template:', message);
  }

  cloneTemplate(message: any) {
    const clonedMessage = { ...message };
    clonedMessage.id = this.generateNewId();
    this.messages.push(clonedMessage);
    // console.log('Cloning template:', message);
    // console.log('Cloned template:', clonedMessage);
  }
  generateNewId() {
    return Math.floor(Math.random() * 100000) + 1;
  }

}
