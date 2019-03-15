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
  @ViewChild('districtClose') districtClose: ElementRef;
  @ViewChild('locationClose') locationClose: ElementRef;
  @ViewChild('blockClose') blockClose: ElementRef;
  @ViewChild('floorClose') floorClose: ElementRef;

  constructor(private commonService: CommonService, private cdRef: ChangeDetectorRef) { }
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

  districtList:any = [];
  districtSearch = '';
  selectedDistrict: any = {};
  selectedDistrictEdit: any = {};

  locationList = [];
  locationSearch = '';
  selectedLocationEdit: any = {};

  blockList = [];
  blockSearch = '';
  selectedBlockEdit: any = {};

  floorList = [];
  floorSearch = '';
  selectedFloorEdit: any = {};

  ngOnInit() {
    this.fetchCountries();
  }

  /************COUNTRY EVENTS START *****************/
  onCountrySelected(country, event) {
    if (event && event.target.classList.value.includes("fa")) {
      return;
    }
    this.selectedCountry = { ...country };
    this.fetchStates();
  }

  onCountryEdited(country) {
    this.selectedCountryEdit = { ...country };
  }

  onDeleteCountry(country_id, index) {
    if (confirm("Are you sure?")) {
      this.commonService.deleteCountry(country_id).subscribe((res) => {
        if (this.selectedCountry && this.selectedCountry.country_id == country_id) {
          this.selectedCountry = null;
          this.fetchStates();
        }
        this.countryList.splice(index, 1);
      }, err => {
        alert("Can't delete country.")
      });
    }
  }

  addCountry() {
    if(this.selectedCountryEdit.country_name.trim().length == 0){
      alert("Empty Entry!");
      return;
    }
    if (this.countryList.some(country => (country.country_id == this.selectedCountryEdit.country_id ? false : country.country_name.toLowerCase().replace(/ /g, '') == this.selectedCountryEdit.country_name.toLowerCase().replace(/ /g, ' ')))) {
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
  onStateSelected(state, event) {
    if (event && event.target.classList.value.includes("fa")) {
      return;
    }
    this.selectedState = { ...state };
    this.fetchDistricts();
  }


  onStateEdited(state) {
    if (state != null) {
      this.selectedStateEdit = { ...state };
    }
    else {
      this.selectedStateEdit = { ...state, country_id: this.selectedCountry.country_id };
    }
  }

  onDeleteState(state_id, index) {
    if (confirm("Are you sure?")) {
      this.commonService.deleteState(state_id).subscribe((res) => {
        if (this.selectedState && this.selectedState.state_id == state_id) {
          this.selectedState = null;
          this.fetchDistricts();
        }
        this.stateList.splice(index, 1);
      }, err => {
        alert("Can't delete State.")
      });
    }
  }

  addState() {
    if(this.selectedStateEdit.statename.trim().length == 0){
      alert("State Name Empty");
      return;
    }
    if (this.stateList.some(state => (state.state_id == this.selectedStateEdit.state_id ? false : state.statename.toLowerCase().replace(/ /g, '') == this.selectedStateEdit.statename.toLowerCase().replace(/ /g, ' ')))) {
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


/************** DISTRICT EVENTS START ********************/
onDistrictSelected(district, event) {
  if (event && event.target.classList.value.includes("fa")) {
    return;
  }
  this.selectedDistrict = { ...district };
  this.fetchCities();
}


onDistrictEdited(district) {

  if (district != null) {
    this.selectedDistrictEdit = { ...district };
  }
  else {
    this.selectedDistrictEdit = {
      ...district,
      country_id: this.selectedCountry.country_id,
      state_id: this.selectedState.state_id
    };
  }
}

onDeleteDistrict(district_id, index) {
  if (confirm("Are you sure?")) {
    this.commonService.deleteDistrict(district_id).subscribe((res) => {
      if (this.selectedDistrict && this.selectedDistrict.district_id == district_id) {
        this.selectedDistrict = null;
        this.fetchCities();
      }
      this.districtList.splice(index, 1);
    }, err => {
      alert("Can't delete district.")
    });
  }
}

addDistrict() {
  if(this.selectedDistrictEdit.district_name.trim().length == 0){
    alert("Empty District Name");
    return;
  }
  if (this.districtList.some(district => (district.district_id == this.selectedDistrictEdit.district_id ? false : district.district_name.toLowerCase().replace(/ /g, '') == this.selectedDistrictEdit.district_name.toLowerCase().replace(/ /g, ' ')))) {
    alert("district Name Already Exists.");
    return;
  }
  if (this.selectedDistrictEdit.district_id) {
    let districtToEdit = this.districtList.find(district => district.district_id == this.selectedDistrictEdit.district_id);
    if (districtToEdit) {
      //api Edit
      this.commonService.updateDistrict(this.selectedDistrictEdit.district_id, this.selectedDistrictEdit).
        subscribe((res: any) => {
          districtToEdit.district_name = this.selectedDistrictEdit.district_name;
          this.districtClose.nativeElement.click();
        }, err => {
          alert('Failed To update district');
        });
    }
  }
  else {
    //api Add
    this.commonService.addDistrict(this.selectedDistrictEdit).subscribe((res: any) => {
      this.selectedDistrictEdit.district_id = res.district_id;
      this.districtList.push(this.selectedDistrictEdit);
      this.cdRef.detectChanges();
      this.districtClose.nativeElement.click();
    }, err => {
      alert("Failed To add district");
    });
  }
}
/************** DISTRICT EVENTS END ********************/


  /************** CITY EVENTS START ********************/
  onCitySelected(city, event) {
    if (event && event.target.classList.value.includes("fa")) {
      return;
    }
    this.selectedCity = { ...city };
    this.fetchLocations();
  }


  onCityEdited(city) {
    if (city != null) {
      this.selectedCityEdit = { ...city };
    }
    else {
      this.selectedCityEdit = {
        ...city,
        country_id: this.selectedState.country_id,
        state_id: this.selectedState.state_id,
        district_id:this.selectedDistrict.district_id
      };
    }
  }

  onDeleteCity(city_id, index) {
    if (confirm("Are you sure?")) {
      this.commonService.deleteCity(city_id).subscribe((res) => {
        if (this.selectedCity && this.selectedCity.city_id == city_id) {
          this.selectedCity = null;
          this.fetchLocations();
        }
        this.cityList.splice(index, 1);
      }, err => {
        alert("Can't delete City.")
      });
    }
  }

  addCity() {
    if(this.selectedCityEdit.cityname.trim().length == 0){
      alert("Empty City Name");
      return;
    }
    if (this.cityList.some(city => (city.city_id == this.selectedCityEdit.city_id ? false : city.cityname.toLowerCase().replace(/ /g, '') == this.selectedCityEdit.cityname.toLowerCase().replace(/ /g, ' ')))) {
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



  /**************  LOCATION EVENTS START ********************/


  onLocationEdited(location) {
    if (location != null) {
      this.selectedLocationEdit = { ...location };
    }
    else {
      this.selectedLocationEdit = {
        ...location,
        country_id: this.selectedCountry.country_id,
        state_id: this.selectedState.state_id,
        city_id: this.selectedCity.city_id,
      };
    }
  }

  onDeleteLocation(location_id, index) {
    if (confirm("Are you sure?")) {
      this.commonService.deleteLocation(location_id).subscribe((res) => {
        this.locationList.splice(index, 1);
      }, err => {
        alert("Can't delete Location.")
      });
    }
  }

  addLocation() {
    if(this.selectedLocationEdit.location_name.trim().length == 0){
      alert("Location Name empty")
      return;
    }
    if (this.locationList.some(location => (location.location_id == this.selectedLocationEdit.location_id ? false : location.location_name.toLowerCase().replace(/ /g, '') == this.selectedLocationEdit.location_name.toLowerCase().replace(/ /g, ' ')))) {
      alert("Location Name Already Exists.");
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



  /**************  BLOCK EVENTS START ********************/

  onBlockEdited(block) {
    this.selectedBlockEdit = { ...block };
  }

  onDeleteBlock(block_id, index) {
    if (confirm("Are you sure?")) {
      this.commonService.deleteBlock(block_id).subscribe((res) => {
        this.blockList.splice(index, 1);
      }, err => {
        alert("Can't delete Block.")
      });
    }
  }

  addBlock() {
    if(this.selectedBlockEdit.blockname.trim().length == 0){
      alert("Empty Block Name")
      return ;
    }
    if (this.blockList.some(block => (block.block_id == this.selectedBlockEdit.block_id ? false : block.blockname.toLowerCase().replace(/ /g, '') == this.selectedBlockEdit.blockname.toLowerCase().replace(/ /g, ' ')))) {
      alert("Block Name Already Exists.");
      return;
    }
    if (this.selectedBlockEdit.block_id) {
      let blockToEdit = this.blockList.find(block => block.block_id == this.selectedBlockEdit.block_id);
      if (blockToEdit) {
        //api Edit
        this.commonService.updateBlock(this.selectedBlockEdit.block_id, this.selectedBlockEdit).
          subscribe((res: any) => {
            blockToEdit.blockname = this.selectedBlockEdit.blockname;
            this.blockClose.nativeElement.click();
          }, err => {
            alert('Failed To update block');
          });
      }
    }
    else {
      //api Add
      this.commonService.addBlock(this.selectedBlockEdit).subscribe((res: any) => {
        this.selectedBlockEdit.block_id = res.block_id;
        this.blockList.push(this.selectedBlockEdit);
        this.cdRef.detectChanges();
        this.blockClose.nativeElement.click();
      }, err => {
        alert("Failed To add block");
      });
    }
  }
  /************** BLOCK EVENTS END ********************/


  /**************  FLOOR EVENTS START ********************/

  onFloorEdited(floor) {
    this.selectedFloorEdit = { ...floor };
  }

  onDeletefloor(floor_id, index) {
    if (confirm("Are you sure?")) {
      this.commonService.deleteFloor(floor_id).subscribe((res) => {
        this.floorList.splice(index, 1);
      }, err => {
        alert("Can't delete Floor.")
      });
    }
  }

  addFloor() {
    if(this.selectedFloorEdit.floor_type.trim().length == 0){
      alert("Empty floor name");
      return;
    }
    if (this.floorList.some(floor => (floor.floor_id == this.selectedFloorEdit.floor_id ? false : floor.floor_type.toLowerCase().replace(/ /g, '') == this.selectedFloorEdit.floor_type.toLowerCase().replace(/ /g, ' ')))) {
      alert("floor Name Already Exists.");
      return;
    }
    if (this.selectedFloorEdit.floor_id) {
      let floorToEdit = this.floorList.find(floor => floor.floor_id == this.selectedFloorEdit.floor_id);
      if (floorToEdit) {
        //api Edit
        this.commonService.updateFloor(this.selectedFloorEdit.floor_id, this.selectedFloorEdit).
          subscribe((res: any) => {
            floorToEdit.floor_type = this.selectedFloorEdit.floor_type;
            this.floorClose.nativeElement.click();
          }, err => {
            alert('Failed To update floor');
          });
      }
    }
    else {
      //api Add
      this.commonService.addFloor(this.selectedFloorEdit).subscribe((res: any) => {
        this.selectedFloorEdit.floor_id = res.floor_id;
        this.floorList.push(this.selectedFloorEdit);
        this.cdRef.detectChanges();
        this.floorClose.nativeElement.click();
      }, err => {
        alert("Failed To add floor");
      });
    }
  }
  /************** FLOOR EVENTS END ********************/


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
    },()=>{
      this.selectedState = null;
      this.stateList = [];
      this.selectedDistrict = null;
      this.districtList = [];
      this.selectedCity = null;
      this.cityList = [];
      this.locationList = [];
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
        this.fetchDistricts();
      },()=>{
        this.selectedDistrict = null;
        this.districtList = [];
        this.selectedCity = null;
        this.cityList = [];
        this.locationList = [];
      });
    }
    else {
      this.stateList = [];
      this.selectedState = null;
      this.fetchDistricts();
    }
  }

  fetchDistricts(){
    if (this.selectedState) {
      this.commonService.getSpecificDistrictDetails(this.selectedState.state_id).subscribe(districtList => {
        this.districtList = districtList;
        if (this.districtList.length) {
          this.selectedDistrict = this.districtList[0];
        }
        else {
          this.selectedDistrict = null;
        }
        this.fetchCities();
      },()=>{ 
        this.selectedCity = null;
        this.cityList = [];
        this.locationList = [];
      });
    } else {
      this.districtList = [];
      this.selectedDistrict = null;
      this.fetchCities();
    }
  }

  fetchCities() {
    if (this.selectedDistrict) {
      this.commonService.getSpecificCitiesDetails(this.selectedDistrict.district_id).subscribe(cityList => {
        this.cityList = cityList;
        if (this.cityList.length) {
          this.selectedCity = this.cityList[0];
        }
        else {
          this.selectedCity = null;
        }
        this.fetchLocations();
      },()=>{
        this.selectedCity = null;
        this.locationList = [];
      });
    } else {
      this.cityList = [];
      this.selectedCity = null;
      this.fetchLocations();
    }
  }


  fetchLocations() {
    if (this.selectedCity) {
      this.commonService.getSpecificLocationsDetails(this.selectedCity.city_id).subscribe((locationList: any) => {
        this.locationList = locationList;
      });
    } else {
      this.locationList = [];
    }
  }
  /***************** FETCH CHAINING END **************/


}
