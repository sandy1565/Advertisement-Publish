import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client-service/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clientList = [];
  constructor(private clientService:ClientService, private router:Router) { }

  ngOnInit() {

    this.clientService.getClients().subscribe((resp:any)=>{
      this.clientList = resp.data;
    },error=>{

    })
  }

  onClickDelete(client_id) {
    console.log(client_id);
    this.clientService.deleteClient(client_id).subscribe((res:any) => {
      console.log("successful");
      this.ngOnInit();
    });
    this.router.navigateByUrl("/super-admin-dashboard/client-list")  }
 
}
