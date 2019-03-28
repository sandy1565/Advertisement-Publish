import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { AdvtModel } from "../../advertisment-details/services/advtDetails.model";
import { AdvtDetailsService } from "../../advertisment-details/services/advt-details.service";


@Component({
  selector: 'app-client-advt-list',
  templateUrl: './advt-list.component.html',
  styleUrls: ['./advt-list.component.css']
})
export class ClientAdvtListComponent implements OnInit {
  users: any;
  dataRefresher: any;
  filteredRegistration: AdvtModel[];
  private _searchTerm: string;
  p: number = 1;
  clientName = [];
  clientId;
  advt_details;
  publish_date;
  age_from;
  age_to;
  selectedClientName;
  getValue;
  ageToFrom;

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
  }

  constructor(
    private advtService: AdvtDetailsService,
    private cdRef:ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.filteredRegistration = this.users;
      this.advtService.getAdvts().subscribe(data => {
        this.users = data;
        this.users.map(user=>{
          if(user.status == 'published'){
            user.editable = false;
          }
          else{
            user.editable = true;
          }
          user.status = (user.status == 'approved');
         
        });
      });

      
      
    this.clientName = [];

    this.advtService.getClient().subscribe(data => {
      this.clientName = data;
    });
  }

  selectClientName() {
    this.selectedClientName = this.clientId;
    console.log(this.selectedClientName);
  }

  cardToEdit: any = {};
  myValue;
  clickOnEditCardBtn(a, i, event) {
    console.log("pop up open", a);
    console.log(i);
    this.cardToEdit.client_id = a.client_id;
    this.cardToEdit.advt_details = a.advt_details;
    this.cardToEdit.publish_date = a.publish_date;
    this.cardToEdit.ageFrom = a.age_from;
    this.cardToEdit.age_to = a.age_to;
    this.myValue = a;
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
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

  onItemClick(a){
    console.log(a);
  }

  fromDate(age_from) {
    this.getValue = this.age_from;
    console.log(this.getValue);
  }

  checkPrice() {
    this.ageToFrom = this.age_to;
    console.log(this.ageToFrom);
    if (this.getValue > this.ageToFrom) {
      alert("Please Enter the correct value.");
    }
  }

  approveAdvrt(advt){
    
    this.advtService.updateStatusAdvtDetails({...advt,status:(advt.status?'approved':'unapproved')},advt.advt_id).subscribe(data=>{
      // advt.status = !advt.status;
      alert("updated status");
      this.cdRef.detectChanges();
    },err=>{
      alert("Error updating records");
      advt.status =  !advt.status;
    });
  }

}
