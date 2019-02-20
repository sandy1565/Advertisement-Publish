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
  filteredRegistration: PersonModel[];
  private _searchTerm: string;
  p = 1;
  countries = [];
  states = [];
  cities = [];
  blocks = [];
  locations = [];
  floors = [];
  selectedBlockName;
  blockId;
  selectedLocationName;
  locationId;
  selectedFloorType;
  floorId;
  selectedCountry;
  selectedState;
  selectedStateName;
  selectedCity;
  gender = ["Male", "Female", "Transgender"];
  cardToEdit: any = {};
  myValue;
  unit: any = {};

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
  }

  modalRef: BsModalRef | null;
  modalRef2: BsModalRef;
  constructor(
    private service: PersonService,
    private router: Router,
    private modalService: BsModalService,
    private datePipe: DatePipe,
    private commonSrvice: CommonService
  ) {}

  genderModel = new Gender();

  getValue(gender) {
    this.genderModel.gender = gender;
  }

  ngOnInit() {
    this.datePipe.transform(Date(), "dd MM yyyy");

    this.commonSrvice.getCountryDetails().subscribe(countryList => {
      localStorage.setItem('countryDetails', JSON.stringify(countryList));
      this.onSelectCountry(this.selectedCountry);
    });

    this.commonSrvice.getStateDetails().subscribe(statesList => {
      localStorage.setItem("stateDetail", JSON.stringify(statesList));
    });

    this.commonSrvice.getCitiesDetails().subscribe(cityList => {
      localStorage.setItem("cityDetails", JSON.stringify(cityList));
    });

    this.service.getPerson().subscribe(data => {
      this.persons = data;
    });

    this.commonSrvice.getFloor().subscribe(data => {
      this.floors = data;
    });

    this.commonSrvice.getBlock().subscribe(data => {
      this.blocks = data;
    });
  }

  onSelectCountry(country_id: number) {
    this.selectedCountry = this.cardToEdit.country_id;
    this.states = this.getStates().filter(item => {
      return item.country_id === Number(country_id);
    });
  }

  onSelectState(state_id: number) {
    this.selectedState = this.cardToEdit.state_id;
    this.selectedStateName = this.selectedState;
    this.cities = this.getCity().filter(item => {
      return item.state_id === Number(state_id);
    });
  }

  onSelectCity(city_id: number) {
    this.selectedCity = this.cardToEdit.city_id;
    const locationData = {
      country_id: this.selectedCountry,
      state_id: this.selectedState,
      city_id: this.selectedCity
    };
    this.getLocations(locationData);
    this.locations = this.getLocations(locationData).filter(item => {
      return item.city_id === Number(city_id);
    });
  }
  getLocations(locationData) {
    let request_data = new URLSearchParams();
    this.locations = [];
    request_data.set("locationData", locationData);
    this.commonSrvice.getLocation(locationData).subscribe(data => {
      return (this.locations = JSON.parse(JSON.stringify(data)));
    });
    return this.locations;
  }

  getCountries() {
    return JSON.parse(localStorage.getItem("countryDetails"));
  }

  getStates() {
    return JSON.parse(localStorage.getItem("stateDetail"));
  }

  getCity() {
    return JSON.parse(localStorage.getItem("cityDetails"));
  }
  selectBlockName() {
    this.selectedBlockName = this.blockId;
  }

  selectFloorName() {
    this.selectedFloorType = this.floorId;
  }

  selectLocation() {
    this.selectedLocationName = this.locationId;
  }

  ngOnDestroy() {
    clearInterval(this.dataRefresher);
  }

  selectDate() {
    let dateofBirth = new Date().toISOString().split("T")[0];
    dateofBirth = new Date(new Date().getTime()).toISOString().split("T")[0];
    document
      .getElementsByName("date_of_birth")[0]
      .setAttribute("max", dateofBirth);
  }

  clickOnEditCardBtn(person, i) {
    this.cardToEdit.person_id = person.person_id;
    this.cardToEdit.firstname = person.firstname;
    this.cardToEdit.middlename = person.middlename;
    this.cardToEdit.lastname = person.lastname;
    this.cardToEdit.selectedCountry = person.country_id;
    this.cardToEdit.selectedState = person.state_id;
    this.cardToEdit.selectedCity = person.city_id;
    this.cardToEdit.blockId = person.block_id.value;
    this.cardToEdit.address = person.address;
    this.cardToEdit.floorId = person.floor_id.value;
    this.cardToEdit.locationId = person.location_id.value;
    this.cardToEdit.pincode = person.pincode;
    this.cardToEdit.date_of_birth = person.date_of_birth;
    this.cardToEdit.mobile_number1 = person.mobile_number1;
    this.cardToEdit.mobile_number2 = person.mobile_number2;
    this.cardToEdit.gender = person.gender;
    this.myValue = person;
  }

  updateCard(i) {
    this.service.updatePersonDetail(this.cardToEdit, i);
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
}
