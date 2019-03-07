import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from 'src/app/services/commonService';

@Component({
  selector: 'app-master-details',
  templateUrl: './master-details.component.html',
  styleUrls: ['./master-details.component.css']
})
export class MasterDetailsComponent implements OnInit {
  @ViewChild('countryClose') countryClose: ElementRef;
  @ViewChild('stateClose') stateClose: ElementRef;

  constructor(private commonService: CommonService) { }
  selectedCountry: any = {};
  selectedCountryEdit: any = {};
  selectedState: any = {};
  selectedStateEdit: any = {};
  selectedCity: any = {};
  selectedCityEdit: any = {};
  countryList = [];
  stateList = [];
  cityList = [];
  floorList = [];
  blockList = [];

  ngOnInit() {
    this.fetchCountries();
  }

  onCountrySelected(country,event) {
    if(event && event.target.classList.value.includes("fa")){
      return;
    }
    this.selectedCountry = { ...country };
    this.fetchStates();
  }

  onStateSelected(state) {
    this.selectedState = { ...state };
    this.fetchCities();
  }

  onCountryEdited(country,event) {
    if(event){
      event.stopPropagation();
    }
    this.selectedCountryEdit = { ...country };
  }

  onStateEdited(state) {
    this.selectedStateEdit = { ...state };
  }

  onDeleteCountry(country_id,index,event){
    if(event){
      event.stopPropagation();
    }
    if(confirm("Are you sure?")){
      this.commonService.deleteCountry(country_id).subscribe((res)=>{
        if(this.selectedCountry && this.selectedCountry.country_id == country_id){
          this.selectedCountry = null;
          this.fetchCities();
        }
        this.countryList.splice(index,1);        
      },err=>{
        alert("Can't delete country.")
      });
    }
  }

  fetchCountries() {
    this.commonService.getCountryDetails().subscribe(countryList => {
      this.countryList = countryList;
      console.log(this.countryList);
      if (this.countryList.length) {
        this.selectedCountry = this.countryList[0];
      }
      else {
        this.selectedCountry = {};
      }
      this.fetchStates();
    });

    this.commonService.getFloor().subscribe(data => {
      this.floorList = data;
    });

    this.commonService.getBlock().subscribe(data => {
      this.blockList = data;
    });
  }

  fetchStates() {
    if (this.selectedCountry) {
      this.commonService.getSpecificStateDetails(this.selectedCountry.country_id).subscribe(statesList => {
        this.stateList = statesList;
        if (this.stateList.length) {
          this.selectedState = this.stateList[0];
        }
        else {
          this.selectedState = null;
        }
        this.fetchCities();
      });
    }
    else {
      this.stateList = [];
      this.selectedState = null;
      this.fetchCities();
    }
  }

  fetchCities() {
    if (this.selectedState) {
      this.commonService.getSpecificCitiesDetails(this.selectedState.state_id).subscribe(cityList => {
        this.cityList = cityList;
        if (this.cityList.length) {
          this.selectedCity = this.cityList[0];
        }
        else {
          this.selectedCity = null;
        }
      });
    } else {
      this.cityList = [];
      this.selectedCity = null;
    }
  }


  addCountry() {
    if (this.selectedCountryEdit.country_id) {
      let countryToEdit = this.countryList.find(country => country.country_id == this.selectedCountryEdit.country_id);
      if (countryToEdit) {
        countryToEdit.country_name = this.selectedCountryEdit.country_name;
        countryToEdit.counrty_code = this.selectedCountryEdit.counrty_code;
        //api Edit
        this.commonService.updateCountry(this.selectedCountryEdit.country_id, this.selectedCountryEdit).
          subscribe((res: any) => {
            this.countryClose.nativeElement.click();
          }, err => {
            alert('Failed');
          });
      }
    }
    else {
      //api Add
      this.commonService.addCountry(this.selectedCountryEdit).subscribe((res: any) => {
        this.selectedCountryEdit.country_id = res.country_id;
        this.countryList.push(this.selectedCountryEdit);
        this.countryClose.nativeElement.click();
      }, err => {
        alert("Failed");
      });
    }
  }


  addState() {
    if (this.selectedState.state_id) {
      let stateToEdit = this.countryList.find(state => state.state_id == this.selectedState.state_id);
      if (stateToEdit) {
        stateToEdit.country_name = this.selectedState.state_name;
      }
    }
    else {
      this.selectedState.state_id = this.stateList.length + 1;
      this.stateList.push(this.selectedState);
    }
    this.stateClose.nativeElement.click();
  }



}
