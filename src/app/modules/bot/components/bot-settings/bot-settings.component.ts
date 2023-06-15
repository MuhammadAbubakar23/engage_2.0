import { Component, OnInit } from '@angular/core';
import { BotService } from '../../services/bot.service';


@Component({
  selector: 'app-bot-settings',
  templateUrl: './bot-settings.component.html',
  styleUrls: ['./bot-settings.component.scss']
})
export class BotSettingsComponent implements OnInit {
  maxSimilarity="";
  threshold="";
  default_response="";
  responseTypes=["get_random_response","get_most_frequent_response","get_first_response"]
  responseName="Please select a response Type"
  constructor(private botService:BotService) { }

  ngOnInit(): void {
    console.log("Get Setting0");
    this.botService.getsettingApi().subscribe((result:any) => {
      this.maxSimilarity=result.maximum_similarity_threshold;
      this.threshold=result.threshold;
      this.default_response=result.default_response
     console.log("Get Setting1",result);
     });
  }

  saveSetting():void{
    this.botService.updatesettingApi({
      "maximum_similarity_threshold": this.maxSimilarity,
      "threshold": this.threshold,
      "default_response": this.default_response
    }).subscribe((result:any) => {
     console.log("Train",result);
     this.maxSimilarity=result.maximum_similarity_threshold;
        this.threshold=result.threshold;
        this.default_response=result.default_response
     alert("Success!");
     },(error:any) => {
      alert("Error!");
    });
}

selectIntent(){

}
}
