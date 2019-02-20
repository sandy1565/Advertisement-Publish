import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client-service/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clientList = [];
  constructor(private clientService:ClientService) { }

  ngOnInit() {

    this.clientService.getClients().subscribe((resp:any)=>{
      this.clientList = resp.data;
    },error=>{

    })
  }

}
