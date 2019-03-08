import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonService } from 'src/app/services/commonService';

@Component({
  selector: 'app-master-details',
  templateUrl: './master-details.component.html',
  styleUrls: ['./master-details.component.css']
})
export class MasterDetailsComponent implements OnInit {
  @ViewChild('countryClose') countryClose: ElementRef;
  @ViewChild('stateClose') stateClose: ElementRef;
  @ViewChild('cityClose') cityClose: ElementRef;
  @ViewChild('locationClose') locationClose: ElementRef;

  constructor(private commonService: CommonService, private cdRef:ChangeDetectorRef) { }
  countryList = [];
  countrySearch = '';
  selectedCountry: any = {};
  selectedCountryEdit: any = {};

  stateList = [];
  stateSearch = '';
  selectedState: any = {};
  selectedStateEdit: any = {};

  cityList = [];
  citySearch = '';
  selectedCity: any = {};
  selectedCityEdit: any = {};

  locationList = [];
  locationSearch = '';
  selectedLocation: any = {};
  selectedLocationEdit: any = {};

  floorList = [];
  blockList = [];

  ngOnInit() {
    this.fetchCountries();
  }

  /************COUNTRY EVENTS START *****************/
  onCountrySelected(country,event) {
    if(event && event.target.classList.value.includes("fa")){
      return;
    }
    this.selectedCountry = { ...country };
    this.fetchStates();
  }

  onCountryEdited(country) {
    this.selectedCountryEdit = { ...country };
  }

  onDeleteCountry(country_id,index){
    if(confirm("Are you sure?")){
      this.commonService.deleteCountry(country_id).subscribe((res)=>{
        if(this.selectedCountry && this.selectedCountry.country_id == country_id){
          this.selectedCountry = null;
          this.fetchStates();
        }
        this.countryList.splice(index,1);        
      },err=>{
        alert("Can't delete country.")
      });
    }
  }

  addCountry() {
    if(this.countryList.some(country=>(country.country_id == this.selectedCountryEdit.country_id?false:country.country_name.toLowerCase().replace(/ /g,'')==this.selectedCountryEdit.country_name.toLowerCase().replace(/ /g,' ')))){
      alert("Invalid Country Name");
      return;
    }
    if (this.selectedCountryEdit.country_id) {
      let countryToEdit = this.countryList.find(country => country.country_id == this.selectedCountryEdit.country_id);
      if (countryToEdit) {       
        //api Edit
        this.commonService.updateCountry(this.selectedCountryEdit.country_id, this.selectedCountryEdit).
          subscribe((res: any) => {
            countryToEdit.country_name = this.selectedCountryEdit.country_name;
            countryToEdit.counrty_code = this.selectedCountryEdit.counrty_code;
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
        this.cdRef.detectChanges();
        this.countryClose.nativeElement.click();
      }, err => {
        alert("Failed");
      });
    }
  }

  /************ COUNTRY EVENTS END *****************/


  /************** STATE EVENTS START ********************/
  onStateSelected(state,event) {
    if(event && event.target.classList.value.includes("fa")){
      return;
    }
    this.selectedState = { ...state };    
    this.fetchCities();
  }

 
  onStateEdited(state) {
    if(state != null){
      this.selectedStateEdit = { ...state };
    }
    else{
      this.selectedStateEdit = { ...state,country_id:this.selectedCountry.country_id };
    }
  }

  onDeleteState(state_id,index){
    if(confirm("Are you sure?")){
      this.commonService.deleteState(state_id).subscribe((res)=>{
        if(this.selectedState && this.selectedState.state_id == state_id){
          this.selectedState = null;
          this.fetchCities();
        }
        this.stateList.splice(index,1);        
      },err=>{
        alert("Can't delete State.")
      });
    }
  }

  addState() {
    if(this.stateList.some(state=>(state.state_id == this.selectedStateEdit.state_id ? false:state.statename.toLowerCase().replace(/ /g,'')==this.selectedStateEdit.statename.toLowerCase().replace(/ /g,' ')))){
      alert("State Name Already Exists.");
      return;
    }
    if (this.selectedStateEdit.state_id) {
      let stateToEdit = this.stateList.find(state => state.state_id == this.selectedStateEdit.state_id);
      if (stateToEdit) {
        //api Edit
        this.commonService.updateState(this.selectedStateEdit.state_id, this.selectedStateEdit).
          subscribe((res: any) => {            
            stateToEdit.statename = this.selectedStateEdit.statename;
            this.stateClose.nativeElement.click();
          }, err => {
            alert('Failed To update state');
          });
      }
    }
    else {
      //api Add
      this.commonService.addState(this.selectedStateEdit).subscribe((res: any) => {
        this.selectedStateEdit.state_id = res.state_id;
        this.stateList.push(this.selectedStateEdit);
        this.cdRef.detectChanges();
        this.stateClose.nativeElement.click();
      }, err => {
        alert("Failed To add state");
      });
    }
  }
  /************** STATE EVENTS END ********************/



  /************** CITY EVENTS START ********************/
  onCitySelected(city,event) {
    if(event && event.target.classList.value.includes("fa")){
      return;
    }
    this.selectedCity = { ...city };
    // this.fetchLocations();
  }

 
  onCityEdited(city) {
    if(city != null){
      this.selectedCityEdit = { ...city };
    }
    else{
      this.selectedCityEdit = { ...city, 
        country_id:this.selectedCountryEdit.country_id,
        state_id:this.selectedCountryEdit.state_id };
    }
  }

  onDeleteCity(city_id,index){
    if(confirm("Are you sure?")){
      this.commonService.deleteCity(city_id).subscribe((res)=>{
        if(this.selectedCity && this.selectedCity.city_id == city_id){
          this.selectedCity = null;
          this.fetchLocations();
        }
        this.cityList.splice(index,1);        
      },err=>{
        alert("Can't delete City.")
      });
    }
  }

  addCity() {
    if(this.cityList.some(city=>(city.city_id == this.selectedCityEdit.city_id ? false:city.cityname.toLowerCase().replace(/ /g,'')==this.selectedCityEdit.cityname.toLowerCase().replace(/ /g,' ')))){
      alert("City Name Already Exists.");
      return;
    }
    if (this.selectedCityEdit.city_id) {
      let cityToEdit = this.cityList.find(city => city.city_id == this.selectedCityEdit.city_id);
      if (cityToEdit) {
        //api Edit
        this.commonService.updateCity(this.selectedCityEdit.city_id, this.selectedCityEdit).
          subscribe((res: any) => {            
            cityToEdit.cityname = this.selectedCityEdit.cityname;
            this.cityClose.nativeElement.click();
          }, err => {
            alert('Failed To update city');
          });
      }
    }
    else {
      //api Add
      this.commonService.addCity(this.selectedCityEdit).subscribe((res: any) => {
        this.selectedCityEdit.city_id = res.city_id;
        this.cityList.push(this.selectedCityEdit);
        this.cdRef.detectChanges();
        this.cityClose.nativeElement.click();
      }, err => {
        alert("Failed To add City");
      });
    }
  }
  /************** city EVENTS END ********************/


  
  /************** CITY LOCATION START ********************/
  onLocationSelected(location,event) {
    if(event && event.target.classList.value.includes("fa")){
      return;
    }
    this.selectedLocation = { ...location };
  }

 
  onLocationEdited(location) {
    if(location != null){
      this.selectedLocationEdit = { ...location };
    }
    else{
      this.selectedLocationEdit = { ...location,
        country_id:this.selectedStateEdit.country_id,
        state_id:this.selectedStateEdit.state_id,
        city_id:this.selectedStateEdit.city_id
      };
    }
  }

  onDeleteLocation(location_id,index){
    if(confirm("Are you sure?")){
      this.commonService.deleteLocation(location_id).subscribe((res)=>{
        if(this.selectedLocation && this.selectedLocation.location_id == location_id){
          this.selectedLocation = null;          
        }
        this.locationList.splice(index,1);        
      },err=>{
        alert("Can't delete City.")
      });
    }
  }

  addLocation() {
    if(this.locationList.some(location=>(location.location_id == this.selectedLocationEdit.city_id ? false:location.location_name.toLowerCase().replace(/ /g,'')==this.selectedLocationEdit.location_name.toLowerCase().replace(/ /g,' ')))){
      alert("City Name Already Exists.");
      return;
    }
    if (this.selectedLocationEdit.location_id) {
      let locationToEdit = this.locationList.find(location => location.location_id == this.selectedLocationEdit.location_id);
      if (locationToEdit) {
        //api Edit
        this.commonService.updateLocation(this.selectedLocationEdit.location_id, this.selectedLocationEdit).
          subscribe((res: any) => {            
            locationToEdit.location_name = this.selectedLocationEdit.location_name;
            this.locationClose.nativeElement.click();
          }, err => {
            alert('Failed To update location');
          });
      }
    }
    else {
      //api Add
      this.commonService.addLocation(this.selectedLocationEdit).subscribe((res: any) => {
        this.selectedLocationEdit.location_id = res.location_id;
        this.locationList.push(this.selectedLocationEdit);
        this.cdRef.detectChanges();
        this.locationClose.nativeElement.click();
      }, err => {
        alert("Failed To add Location");
      });
    }
  }
  /************** LOCATIONS EVENTS END ********************/


 /***************** FETCH CHAINING START**************/
  fetchCountries() {
    this.commonService.getCountryDetails().subscribe(countryList => {
      this.countryList = countryList;
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
        this.fetchLocations();
      });
    } else {
      this.cityList = [];
      this.selectedCity = null;
      this.fetchLocations();
    }
  }


  fetchLocations() {
    if (this.selectedCity) {
      this.commonService.getSpecificLocationsDetails(this.selectedCity.city_id).subscribe((locationList:any) => {
        this.locationList = locationList;
        if (this.locationList.length) {
          this.selectedLocation = this.locationList[0];
        }
        else {
          this.selectedLocation = null;
        }
      });
    } else {
      this.locationList = [];
      this.selectedLocation = null;
    }
  }
/***************** FETCH CHAINING END **************/


}
