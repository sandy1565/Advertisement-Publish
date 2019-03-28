import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormGroup, FormsModule } from '@angular/forms';
import { PersonService } from '../person-service/person.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location as LocationService } from '@angular/common';
import { Gender } from '../../services/commonModal';
import { CommonService } from '../../services/commonService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})

export class PersonFormComponent implements OnInit {
  countries = [];
  states = [];
  districts = [];
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
  selectedDistrictName;
  selectedCityName;
  selectedCountry = 1;
  selectedState;
  selectedCity;
  selectedDistrict;
  model: any = {};
  gender = ['Male', 'Female', 'Transgender'];
  person_record: any = {};
  editMode = false;

  constructor(private service: PersonService, private route: Router, private commonService: CommonService,
     private activatedRoute: ActivatedRoute, private toastr: ToastrService) { }

  genderModel = new Gender();

  getValue(e) {
    this.gender = e.target.value;
    console.log('--------------this.genderModel.gender =================', this.gender);
  }

  ngOnInit() {
    document.addEventListener('keypress', (e)=>{
      // console.log(e.charCode);
      if(e.charCode == 32){
       document.getElementById("mobile_number1").focus();
      }
      if(e.charCode == 46){
        document.getElementById("address").focus();
      }
    });
    this.commonService.getCountryDetails().subscribe(countryList => {
      localStorage.setItem('countryDetails', JSON.stringify(countryList));
      // this.onSelectCountry(this.selectedCountry);
    });

    this.commonService.getStateDetails().subscribe(statesList => {
      localStorage.setItem('stateDetail', JSON.stringify(statesList));
    });

    this.commonService.getDistrictDetails().subscribe(districtList => {
      localStorage.setItem('districtDetails', JSON.stringify(districtList));
    })

    this.commonService.getCitiesDetails().subscribe(cityList => {
      localStorage.setItem('cityDetails', JSON.stringify(cityList));
    });

    this.commonService.getFloor().subscribe(data => {
      this.floors = data;
    });

    this.commonService.getBlock().subscribe(data => {
      this.blocks = data;
    });

    if (this.activatedRoute.snapshot.params.id) {
      let person_id = this.activatedRoute.snapshot.params.id;
      console.log(person_id);
      this.editMode = true;
      this.service.getPersonDetails(person_id).subscribe((resp: any) => {
        this.person_record = resp.data;
        this.onSelectCountry(+this.person_record.country_id);
        this.onSelectState(+this.person_record.state_id);
        this.onSelectDistrict(+this.person_record.district_id);
        this.onSelectCity(+this.person_record.city_id);
      })
    };

    // this.person_record.country_id = "1";
    // this.onSelectCountry(+this.person_record.country_id);
    // this.person_record.state_id = "27";
    // this.onSelectState(+this.person_record.state_id);    
    // this.person_record.district_id = "11";
    // this.onSelectDistrict(+this.person_record.district_id);    
    // this.person_record.city_id = "25"; 
    // this.onSelectCity(+this.person_record.city_id);
    // this.person_record.block_id = 24;    
    // this.person_record.gender = 'Male';

   
  }



  onSelectCountry(country_id: number) {
    this.selectedCountry = country_id;
    this.states = this.getStates().filter(item => {
      return item.country_id === Number(country_id);
    });
    this.districts = [];
    this.cities = [];
    this.locations =[];
  }

   onSelectState(state_id: number) {
    this.selectedState = state_id;
    this.selectedStateName = this.selectedState;
    this.districts = this.getDistrict().filter(item => {
      return item.state_id === Number(state_id);
    });
    this.cities = [];
    this.locations =[];
  }

  onSelectDistrict(district_id: number) {
    this.selectedDistrict = district_id;
    this.selectedDistrictName = this.selectedDistrict;
    this.cities = this.getCity().filter(item => {
      return item.district_id === Number(district_id);
    });
  }

  onSelectCity(city_id: number) {
    this.selectedCity = city_id;
    const locationData = {
      country_id: this.selectedCountry,
      state_id: this.selectedState,
      district_id:this.selectedDistrict,
      city_id: this.selectedCity
    };

    this.getLocations(locationData);
    this.locations = this.getLocations(locationData).filter(item => {
      return item.city_id === Number(city_id);
    });    
    // this.person_record.location_id = 3; 
  }

  getLocations(locationData) {
    const request_data = new URLSearchParams();
    this.locations = [];
    request_data.set('locationData', locationData);
    this.commonService.getLocation(locationData).subscribe(data => {
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

  getDistrict() {
    return JSON.parse(localStorage.getItem('districtDetails'));
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
    console.log(this.person_record)
    this.selectedFloorType = this.floorId;
    console.log(this.selectedFloorType);
  }

  onSubmit(data) {
    let fstname = document.getElementById('first_name');
    if (this.editMode) {
      this.service.updatePersonDetail(data, this.person_record.person_id).subscribe(data => {
        console.log(data);
        this.ngOnInit();
      },(err:any)=>{
        // this.toastr.error('Please Provide another mobile number, this number is already registered.');
        alert(err.message);
      })
    }
    else {
      if(data.mobile_number1.length != 10){
        this.toastr.error('Please Provide a Valid Number.');
      }
      else {
      this.service.addPersonDetails(data).subscribe(data => {
        console.log('added successfully');
      },(err:any)=>{
        this.toastr.error('Please Provide another mobile number, this number is already registered.');
        // alert(err.message);
      });
    }
    }
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


  job(){
    let d = {address: "HNO 92",
    block_id: 24,
    city_id: "25",
    country_id: "1",
    district_id: "11",
    state_id: "27",
    gender: "Male",
    middlename: "",
    location_id: 3,
  }

let failure = [];
let counter = 0;
let ar1 = ["tilak bansal 283 9999676743","ragu prasad 284 9873071166","gaya singh 285 9958835032",
"joti s 286 9711029308","anand s 287 1165689511","rakesh sharma 257 9810118082",
"prem sharma 89 9711387518"];

let total = ar1.length;
console.log("total", total);
for(let i=0;i<ar1.length;i++){
    let ob:any = {...d};
    if(ar1[i]){
      ob.firstname = ar1[i].split(" ")[0];
      ob.lastname = ar1[i].split(" ")[1];
      ob.address = "HNO "+ar1[i].split(" ")[2];      
      ob.mobile_number1 = ar1[i].split(" ")[3];
      this.service.addPersonDetails(ob).subscribe(data => {        
      ++counter;
      },err=>{
        failure.push(ob);
      });
    }
}
}

}