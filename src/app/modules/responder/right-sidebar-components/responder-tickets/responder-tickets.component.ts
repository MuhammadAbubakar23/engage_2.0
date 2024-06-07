import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreateTicketService } from 'src/app/services/CreateTicketService/create-ticket.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { createTicketDto } from 'src/app/shared/Models/CreateTicketDto';
import { GetOrderDetailDto } from 'src/app/shared/Models/getOrderDetailDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { TicketResponseService } from 'src/app/shared/services/ticketResponse/ticket-response.service';

@Component({
  selector: 'app-responder-tickets',
  templateUrl: './responder-tickets.component.html',
  styleUrls: ['./responder-tickets.component.scss'],
})
export class ResponderTicketsComponent implements OnInit {
  ReasonTypes: any;
  Information: any[] = [];
  Reasons: any[] = [];
  SubReasons: any[] = [];
  OrderStatuses: any[] = [];

  spinner1running=false
  spinner2running=false

  Error: any;
  constructor(
    private commonDataservice: CommonDataService,
    private createTicketService: CreateTicketService,
    private toggleService: ToggleService,
    private spinnerService : NgxSpinnerService,
    private ticketResponseService : TicketResponseService
  ) {
    this.createTicketForm = new FormGroup({
      queryId: new FormControl(),
      name: new FormControl('string'),
      phoneNumber: new FormControl('string'),
      address: new FormControl('string'),
      emailAddress: new FormControl('string'),
      ticketType: new FormControl('string'),
      reasonId: new FormControl('string'),
      reasonName: new FormControl('string'),
      subReasonId: new FormControl('string'),
      subReasonName: new FormControl('string'),
      status: new FormControl('string'),
      orderId: new FormControl('string'),
      orderDate: new FormControl('string'),
      payment: new FormControl('string'),
      modeOfPayment: new FormControl('string'),
      orderStatus: new FormControl('string'),
      shippingAddress: new FormControl('string'),
      productName: new FormControl('string'),
      sku: new FormControl('string'),
      unitPrice: new FormControl('string'),
      quantity: new FormControl('string'),
      details: new FormControl('string'),
      resolutionComments: new FormControl('', Validators.required),
      jomoCustomerId: new FormControl('string'),
      channelType: new FormControl('string'),
      customerProfileId: new FormControl('string'),
    });
  }

  ngOnInit(): void {
    this.getReasonTypes();
    this.getTicketStatus();
    // this.GetReasonTypesTest();
  }
  public ngOnDestroy(): void {}
  show: any = false;
  click(val: any) {
    if (val == true) {
      this.show = false;
    }
    if (val == false) {
      this.show = true;
    }
  }
  public getReasonTypes(): void {
    
    this.spinnerService.show();
    this.spinner2running = true
    this.commonDataservice.GetReasonTypes().subscribe(
      (res: any) => {
        this.spinnerService.hide();
        this.spinner2running = false
        this.Information = res.data;
      },
      (err: any) => {
        this.Error = err;
      }
    );
  }

  public getMainReasons(type: any) {
    this.SubReasons = [];
    this.spinnerService.show();
    this.spinner2running = true
    this.commonDataservice
      .GetMainReasons(type.target.value)
      .subscribe((res: any) => {
        
        this.spinnerService.hide();
        this.spinner2running = false
        this.Reasons = res.data;
      });
  }
  public getSubReasons(reasonId: any): void {
    this.spinnerService.show();
    this.spinner2running = true
    this.commonDataservice
      .GetSubReasons(reasonId.target.value)
      .subscribe((res: any) => {
        this.spinnerService.hide();
        this.spinner2running = false
        this.SubReasons = res.data;
      });
  }

  ticketStatuses: any[]=[];

  getTicketStatus() {
    this.commonDataservice.GetTicketStatuses().subscribe((res: any) => {
      this.ticketStatuses = res.data;
    });
  }
  

  ticketId: number = 0;
  createTicketDto = new createTicketDto();
  createTicketForm!: FormGroup;
  responseTicket:any;

  createTicket() {
    this.createTicketDto = {
      queryId: this.createTicketService.commentId,
      name: this.createTicketForm.value.name,
      phoneNumber: this.createTicketForm.value.phoneNumber,
      address: this.createTicketForm.value.address,
      emailAddress: this.createTicketForm.value.emailAddress,
      ticketType: this.createTicketForm.value.ticketType,
      reasonId: this.createTicketForm.value.reasonId,
      reasonName: this.createTicketForm.value.reasonName,
      subReasonId: this.createTicketForm.value.subReasonId,
      subReasonName: this.createTicketForm.value.subReasonName,
      status: this.createTicketForm.value.status,
      orderId: this.createTicketForm.value.orderId,
      orderDate: this.createTicketForm.value.orderDate,
      payment: this.createTicketForm.value.payment,
      modeOfPayment: this.createTicketForm.value.modeOfPayment,
      orderStatus: this.createTicketForm.value.orderStatus,
      shippingAddress: this.createTicketForm.value.shippingAddress,
      productName: this.createTicketForm.value.productName,
      sku: this.createTicketForm.value.sku,
      unitPrice: this.createTicketForm.value.unitPrice,
      quantity: this.createTicketForm.value.quantity,
      details: this.createTicketForm.value.details,
      resolutionComments: this.createTicketForm.value.resolutionComments,
      jomoCustomerId: this.createTicketForm.value.jomoCustomerId,
      channelType: this.createTicketForm.value.channelType,
      customerProfileId: this.createTicketForm.value.customerProfileId,
    };

    this.commonDataservice
      .CreateTicket(this.createTicketDto)
      .subscribe((res: any) => {
        this.responseTicket = res;
        this.ticketResponseService.sendTicketId(res);
        this.reloadComponent('ticketCreated')
        setTimeout(() => {
          this.closeTicketComponent('ticket')
        }, 1000);
      });
  }

  getOrderDetailDto = new GetOrderDetailDto();

  getOrderDetailForm = new FormGroup({
    emailAddressOrPhoneNumberOrProfileId: new FormControl(''),
    profileId: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    channel: new FormControl(''),
  });

  OrderDetails: any[]=[];

  getOrderByCustomerEmailAddressOrPhoneNumber() {
    this.spinnerService.show();
    this.spinner2running = true;
    this.commonDataservice
      .GetOrderByCustomerEmailAddressOrPhoneNumber(
        this.getOrderDetailForm.value
      )
      .subscribe((res: any) => {
        this.OrderDetails = res.orders;
        this.spinnerService.hide();
        this.spinner2running = false
      });
  }

  LineItems: any;
  address: string = '';
  phone: any;
  city: any;
  getLineItems(id: any) {
    this.OrderDetails.forEach((order: any) => {
      if (order.id == id.target.value) {
        this.LineItems = order.lineItems;
        this.address = order.shippingAddress.address1;
        this.phone = order.shippingAddress.phone;
        this.city = order.shippingAddress.city;
      }
    });
  }

  closeTicketComponent(child: string) {
    if (localStorage.getItem('child') == child) {
      this.toggleService.addTogglePanel('');
    } else {
      this.toggleService.addTogglePanel(child);
    }
  }

  AlterMsg:any;
  toastermessage:any;
  reloadComponent(type: any) {
    if (type == 'ticketCreated') {
      this.AlterMsg = 'Ticket created Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'comment') {
      this.AlterMsg = 'Comment Send Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'fbmessage') {
      this.AlterMsg = 'Message Send Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'ApplyTag') {
      this.AlterMsg = 'Tag Apply Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'RemoveTag') {
      this.AlterMsg = 'Tag Removed Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'Sentiment') {
      this.AlterMsg = 'Sentiment Apply Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'Like') {
      this.AlterMsg = 'Liked Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'disLike') {
      this.AlterMsg = 'Dislike Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
  }
  closeToaster() {
    this.toastermessage = false;
  }
}
