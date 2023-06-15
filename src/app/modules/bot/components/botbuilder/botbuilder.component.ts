import { ViewChild } from "@angular/core";
import { Component, OnInit } from '@angular/core';
import { StepOneComponent } from "../step-one/step-one.component";
import { BotService } from "../../services/bot.service";

@Component({
  selector: 'app-botbuilder',
  templateUrl: './botbuilder.component.html',
  styleUrls: ['./botbuilder.component.scss']
})
export class BotbuilderComponent implements OnInit {
  IntentName: string = '';
  listofIntent:any=[];
   ngOnInit(): void {
}

constructor(private botService: BotService){

}


preview(step1:any,step2:any,step3:any):void{
this.listofIntent=[];
this.listofIntent.push(step1.value,step2.value,step3.value);
console.log(this.listofIntent)
  this.botService.updateintents(this.listofIntent);
}
}
