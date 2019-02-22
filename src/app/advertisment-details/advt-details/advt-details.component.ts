import { Component, OnInit } from "@angular/core";
import { AdvtDetailsService } from "../services/advt-details.service";
import { CommonService } from '../../services/commonService';

@Component({
  selector: 'app-advt-details',
  templateUrl: './advt-details.component.html',
  styleUrls: ['./advt-details.component.scss']
})
export class AdvtDetailsComponent implements OnInit {
  constructor(private advtService: AdvtDetailsService, private commonService: CommonService) { }

  clients = [];
  blocks = [];
  states = [];
  cities = [];
  locations = [];
  selectedCountry;
  selectedLocationName;
  selectedFloorType;
  selectedStateName;
  selectedCityName;
  selectedState;
  selectedCity;
  countryList;
  stateId;
  cityId;
  selectionLocationId;
  locationId;
  floorId;
  clientId;
  advt_details;
  publish_date;
  age_from;
  age_to;
  ageToFrom;
  selectedClientName;
  getValue;
  advt_subject;
  client = [];

  ngOnInit() {
    this.advtService.getClient().subscribe(data => {
      this.clients = data;
    });

    this.commonService.getCountryDetails().subscribe(countryList => {
      localStorage.setItem('countryDetails', JSON.stringify(countryList));
      this.onSelectCountry(this.selectedCountry);
    });

    this.commonService.getBlock().subscribe(data => {
      this.blocks = data;
    });
  }

  onSelectCountry(country_id: number) {
    this.selectedCountry = country_id;
    this.states = this.getStates().filter(item => {
      return item.country_id === Number(country_id);
    });
  }

  onSelectState(state_id: number) {
    this.selectedState = state_id;
    this.selectedStateName = this.selectedState;
    this.cities = this.getCity().filter(item => {
      return item.state_id === Number(state_id);
    });
  }

  onSelectCity(city_id: number) {
    this.selectedCity = city_id;
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
      return (this.locations = JSON.parse(
        (JSON.stringify(data))
      ));
    });
    return this.locations;
  }

  getCountries() {
    return JSON.parse(localStorage.getItem('countryDetails'));
  }

  getStates() {
    return JSON.parse(localStorage.getItem('stateDetail'));
  }

  getCity() {
    return JSON.parse(localStorage.getItem('cityDetails'));
  }

  selectLocation() {
    this.selectedLocationName = this.locationId;
  }

  selectLocationName() {
    this.selectionLocationId = this.locationId;
  }

  selectClientName() {
    this.selectedClientName = this.clientId;
    console.log(this.selectedClientName);
  }

  onSubmit(event, AdvtDetails, publishDate, ageFrom, ageTo) {
    const advtDetails = {};
    advtDetails['client_id'] = this.selectedClientName;
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
