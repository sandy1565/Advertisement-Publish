import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clientList = [ {
    "clientName": "Mohit Bhai",
    "representativeName": "Mohit Rottela",
    "represnetativeId": 264454,
    "mobileNumber": 6595875651
  }];
  constructor() { }

  ngOnInit() {
  }

  clickOnEditCardBtn(e) {
    console.log(e);
    
  }

}
