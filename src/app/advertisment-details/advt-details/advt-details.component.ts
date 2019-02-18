import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AdvtDetailsService } from "../services/advt-details.service";
import { ClientModel } from "../services/advtDetails.model";
import { HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-advt-details',
  templateUrl: './advt-details.component.html',
  styleUrls: ['./advt-details.component.scss']
})
export class AdvtDetailsComponent implements OnInit {
  constructor(private advtService: AdvtDetailsService) {}

  clients = [];
  clientId;
  advt_details;
  publish_date;
  age_from;
  age_to;
  ageToFrom;
  selectedClientName;
  getValue;
  advt_subject;

  ngOnInit() {
    this.clients = [];
    this.advtService.getClient().subscribe(data => {
      this.clients = data;
    });
  }

  selectClientName() {
    this.selectedClientName = this.clientId;
    console.log(this.selectedClientName);
  }

  onSubmit(event, AdvtDetails, publishDate, ageFrom, ageTo) {
    const advtDetails = {};
    advtDetails[ 'client_id'] = this.selectedClientName;
    advtDetails['advt_details'] = AdvtDetails;
    advtDetails['publish_date'] = publishDate;
    advtDetails['age_from'] = ageFrom;
    advtDetails['age_to'] = ageTo;

    this.advtService.addAdvtDetails(advtDetails).subscribe(data => {
      console.log(data);
      console.log('added successfully');
    });
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressed(event: any) {
    const pattern = /^[a-zA-Z]+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  fromDate(age_from) {
    this.getValue = this.age_from;
    console.log(this.getValue);
  }

  checkPrice() {
    this.ageToFrom = this.age_to;
    console.log(this.ageToFrom);
    if (this.getValue > this.ageToFrom) {
      alert('Please Enter the correct value.');
    }
  }
}
