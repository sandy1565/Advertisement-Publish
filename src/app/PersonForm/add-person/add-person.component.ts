import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormsModule } from '@angular/forms';
import { PersonServiceService } from '../person-service/person.service';
// import { PersonModel, Floor, Block, Location } from '../services/person.model';
import { Router } from '@angular/router';
import { Gender } from '../person-service/person.modal';
@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class PersonFormComponent implements OnInit {
  countries = [];
  states = [];
  cities = [];
  blocks = [];
  locations = [];
  floors = [];
  firstname;
  middlename;
  lastname;
  countryList;
  stateId;
  cityId;
  blockId;
  floorId;
  locationId;
  address;
  pincode;
  date_of_birth;
  mobile_number1;
  mobile_number2;
  selectedBlockName;
  selectedLocationName;
  selectedFloorType;
  selectedStateName;
  selectedCityName;
  selectedCountry = 1;
  selectedState;
  selectedCity;
  model: any = {};
  constructor(private service: PersonServiceService, private route: Router) {}

  genderModel = new Gender();

  getValue(gender) {
    this.genderModel.gender = gender;
    console.log('--------------this.genderModel.gender =================', this.genderModel.gender);
  }

  ngOnInit() {
    this.service.getCountryDetails().subscribe(countryList => {
      localStorage.setItem('countryDetails', JSON.stringify(countryList));
      this.onSelectCountry(this.selectedCountry);
    });

    this.service.getStateDetails().subscribe(statesList => {
      localStorage.setItem('stateDetail', JSON.stringify(statesList));
    });

    this.service.getCitiesDetails().subscribe(cityList => {
      localStorage.setItem('cityDetails', JSON.stringify(cityList));
    });

    this.service.getFloor().subscribe(data => {
      this.floors = data;
    });

    this.service.getBlock().subscribe(data => {
      this.blocks = data;
    });
  }

  onSelectCountry(country_id: number) {
    this.selectedCountry = country_id;
    console.log('=============country_id===================', country_id);
    this.states = this.getStates().filter(item => {
      return item.country_id === Number(country_id);
    });
  }

  onSelectState(state_id: number) {
    console.log('=========================== Onselect');
    this.selectedState = state_id;
    this.selectedStateName = this.selectedState;
    this.cities = this.getCity().filter(item => {
      // console.log("-----onSelectState--------this.cities", this.cities);
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
    this.service.getLocation(locationData).subscribe(data => {
      console.log('==================', data);
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
    console.log('get states ==========================');
    return JSON.parse(localStorage.getItem('stateDetail'));
  }

  getCity() {
    console.log('=================== getCity()');
    return JSON.parse(localStorage.getItem('cityDetails'));
  }

  selectLocation() {
    this.selectedLocationName = this.locationId;
    console.log(this.selectedLocationName);
  }

  selectDate() {
    console.log('enter into the date picker');
    let dateofBirth = new Date().toISOString().split('T')[0];
    dateofBirth = new Date(new Date().getTime()).toISOString().split('T')[0];
    document.getElementsByName('date_of_birth')[0].setAttribute('max', dateofBirth);
  }

  selectBlockName() {
    this.selectedBlockName = this.blockId;
    console.log(this.selectedBlockName);
  }

  selectFloorName() {
    this.selectedFloorType = this.floorId;
    console.log(this.selectedFloorType);
  }

  onSubmit(event, firstName, middleName, lastName, Address, Pincode, dateofbirth, mobilenumber1, mobilenumber2) {
    const personDetails = {};
    personDetails['firstname'] = firstName;
    personDetails['middlename'] = middleName;
    personDetails['lastname'] = lastName;
    personDetails['block_id'] = this.selectedBlockName;
    personDetails['address'] = Address;
    personDetails['country_id'] = this.selectedCountry;
    personDetails['state_id'] = this.selectedState;
    personDetails['state_id'] = this.selectedState;
    personDetails['city_id'] = this.selectedCity;
    personDetails['floor_id'] = this.selectedFloorType;
    personDetails['location_id'] = this.selectedLocationName;
    personDetails['date_of_birth'] = dateofbirth;
    personDetails['pincode'] = Pincode;
    personDetails['gender'] = this.genderModel.gender;
    personDetails['mobile_number1'] = mobilenumber1;
    personDetails['mobile_number2'] = mobilenumber2;
    // if(this.validateinput.validateInput(personDetails)) {

    this.service.addPersonDetails(personDetails).subscribe(data => {
      console.log(data);
      console.log('added successfully');
      this.route.navigateByUrl('/person-list');
    });
    // }
  }

  ////// validation/////////////

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressed(event: any) {
    const pattern = /^[a-zA-Z]+$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
