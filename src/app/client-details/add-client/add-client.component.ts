import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../services/commonService";
import { ClientService } from "../client-service/client.service";

@Component({
  selector: "app-add-client",
  templateUrl: "./add-client.component.html",
  styleUrls: ["./add-client.component.css"]
})
export class AddClientComponent implements OnInit {
  selectedStateName;
  selectedLocationName;
  selectedCountry;
  selectedState;
  selectedCity;
  countries = [];
  states = [];
  cities = [];
  locations = [];
  blocks = [];
  locationId;

  constructor(
    private commonService: CommonService,
    private clientService: ClientService
  ) {}

  typeOfFirm = [
    "Limited",
    "Pvt. Limited",
    "Limited liability company (LLC), Semi goverment"
  ];

  ngOnInit() {
    this.commonService.getCountryDetails().subscribe(countryList => {
      localStorage.setItem("countryDetails", JSON.stringify(countryList));
      this.onSelectCountry(this.selectedCountry);
    });

    this.commonService.getStateDetails().subscribe(statesList => {
      localStorage.setItem("stateDetail", JSON.stringify(statesList));
    });

    this.commonService.getCitiesDetails().subscribe(cityList => {
      localStorage.setItem("cityDetails", JSON.stringify(cityList));
    });

    this.commonService.getBlock().subscribe(data => {
      this.blocks = data;
    });

  }

  onSelectCountry(country_id: number) {
    this.selectedCountry = country_id;
    console.log("=============country_id===================", country_id);
    this.states = this.getStates().filter(item => {
      return item.country_id === Number(country_id);
    });
  }

  onSelectState(state_id: number) {
    this.selectedState = state_id;
    this.selectedStateName = this.selectedState;
    this.cities = this.getCity().filter(item => {
      // console.log("-----onSelectState--------this.cities", this.cities);
      return item.state_id === Number(state_id);
    });
  }

  onSelectCity(city_id: number) {
    this.selectedCity = city_id;
    console.log(this.selectedCity);

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
    const request_data = new URLSearchParams();
    this.locations = [];
    request_data.set('locationData', locationData);
    this.commonService.getLocation(locationData).subscribe(data => {
      return (this.locations = JSON.parse(JSON.stringify(data)));
    });
    return this.locations;
  }

  getCountries() {
    return JSON.parse(localStorage.getItem("countryDetails"));
  }

  getStates() {
    console.log("get states ==========================");
    return JSON.parse(localStorage.getItem("stateDetail"));
  }

  getCity() {
    console.log("=================== getCity()");
    return JSON.parse(localStorage.getItem("cityDetails"));
  }
  selectLocation() {
    this.selectedLocationName = this.locationId;
    console.log(this.selectedLocationName);
  }

  onSubmit(data) {
    this.clientService
      .addClient(data)
      .subscribe((resp: any) => {}, (err: any) => {});
  }
}
