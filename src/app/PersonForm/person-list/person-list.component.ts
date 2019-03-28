import { Component, OnInit, TemplateRef } from "@angular/core";
import { PersonModel } from "../person-service/person.modal";
import { PersonService } from "../person-service/person.service";
import { Router } from "@angular/router";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { DatePipe } from "@angular/common";
import { Gender } from "../../services/commonModal";
import { CommonService } from "../../services/commonService";
@Component({
  selector: "app-person-list",
  templateUrl: "./person-list.component.html",
  styleUrls: ["./person-list.component.scss"]
})
export class PersonListComponent implements OnInit {
  persons: any;
  dataRefresher: any;
  p:any;
  filteredRegistration: PersonModel[];
  domain = "super-admin-dashboard";

  constructor(
    private service: PersonService,
    private router: Router,
    private datePipe: DatePipe,
  ) {}


  ngOnInit() {
    this.datePipe.transform(Date(), "dd MM yyyy");
    this.service.getPerson().subscribe(data => {
      this.persons = data;
    });
    this.domain = location.pathname.split("/")[1];
  }


  onClickDelete(person_id) {
    console.log(person_id);
    this.service.deletePersonDetails(person_id).subscribe((res:any) => {
      console.log("successful");
      this.ngOnInit();
    });
  }
}
