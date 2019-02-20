import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdvertisePublishService } from '../services/advertise-publish.service';
import { Gender } from '../../services/commonModal';
import { CommonService } from '../../services/commonService';

@Component({
  selector: 'app-advertise-publish',
  templateUrl: './advertise-publish.component.html',
  styleUrls: ['./advertise-publish.component.scss']
})

export class AdvertisePublishComponent implements OnInit  {
  constructor(private advertisepublishService: AdvertisePublishService, private commonService: CommonService) {  }
  userSelectsString = '';
  locations = [];
  blocks = [];
  fromAge;
  toAge;
  age_as_per_advtPublishDate;
  selectedBlockId;
  blockId;
  selectionLocationId;
  locationId;
  show = false;
  userSelects = [];
  gender = ['Male', 'Female', 'Transgender'];
  genderModel = new Gender();
  countries = [];
  states = [];
  cities = [];
  selectedCountry = 1;
  selectedLocationName;
  selectedFloorType;
  selectedStateName;
  selectedCityName;
  selectedState;
  selectedCity;
  countryList;
  stateId;
  cityId;
  floorId;
  textMessage;

  ngOnInit() {
    this.blocks = [];
    this.locations = [];

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

  getValue(e){
    this.gender = e.target.value;
  }
  
  selectLocationName() { 
      this.selectionLocationId = this.locationId;
  } 
 
  selectBlockName() {
    this.selectedBlockId = this.blockId;
  }

  assignToNgModel() {
    this.userSelectsString = '';
    this.userSelects.map((item) => this.userSelectsString += item.locationName + ' ');
  }
 
  publishDetails(event, fromAge, toAge, textMessage) {  
    const publishModel = {};
    publishModel['gender'] = this.genderModel.gender;
    publishModel['fromAge'] = fromAge;
    publishModel['toAge'] = toAge;
    publishModel['location_id'] = this.userSelects;
    publishModel['block_id'] = this.selectedBlockId;
    publishModel['country_id'] = this.selectedCountry;
    publishModel['state_id'] = this.selectedState;
    publishModel['city_id'] = this.selectedCity;
    publishModel['location_id'] = this.selectedLocationName;
    publishModel['text_message'] = textMessage;
    this.advertisepublishService.addPublish(publishModel).subscribe((data)=> {
        console.log('======================', publishModel);
        console.log('Successfully added !');
      });
    }
  }

