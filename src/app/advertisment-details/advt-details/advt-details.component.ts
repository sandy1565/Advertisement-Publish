import { Component, OnInit } from "@angular/core";
import {Location} from '@angular/common';
import { AdvtDetailsService } from "../services/advt-details.service";
import { CommonService } from '../../services/commonService';
import { Router, ActivatedRoute } from '@angular/router';
import { AudioRecordingService } from '../../record-rtc/record-rtc.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FILE_URN } from "../../CommonConst/constURN";


@Component({
  selector: 'app-advt-details',
  templateUrl: './advt-details.component.html',
  styleUrls: ['./advt-details.component.scss']
})
export class AdvtDetailsComponent implements OnInit {
  FILE_URN = FILE_URN;
  constructor(private advtService: AdvtDetailsService, private commonService: CommonService, 
    private location:Location,
              private router: Router, private activatedRoute:ActivatedRoute, 
              private audioRecordingService: AudioRecordingService, private sanitizer: DomSanitizer) {
                this.audioRecordingService.recordingFailed().subscribe(() => {
                  this.isRecording = false;
                });
            
                this.audioRecordingService.getRecordedTime().subscribe((time) => {
                  this.recordedTime = time;
                });
            
                this.audioRecordingService.getRecordedBlob().subscribe((data) => {
                  this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
                });
               }

  clients = [];
  blocks = [];
  states = [];
  cities = [];
  locations = [];
  districts = [];
  selectedDistrict:any='';
  selectedDistrictName='';
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
  selectedBlockId;
  blockId;
  advt_record:any = {};
  editMode = false;
  isRecording = false;
  recordedTime;
  blobUrl;
  audioBase64;
  types = [ 'message', 'email', 'voice' ];
  selectedTypes = ['email'];
  voiceType = 1;
  publish_dates:any[] = [
    {
    }
  ];

  ngOnInit() {
   this.audioRecordingService.getRecordedBlob().subscribe(data=>{
    console.log(data);
    let fr = new FileReader();
    fr.readAsDataURL(data.blob);
    fr.onloadend = ()=> {
      this.audioBase64 = fr.result;
      console.log(this.audioBase64);
    };
   });

    if(this.activatedRoute.snapshot.params.id){
      let advt_id = this.activatedRoute.snapshot.params.id;
      this.editMode = true;
      this.advtService.getAdvt(advt_id).subscribe((resp:any)=>{
      
        this.advt_record = resp.data;
        this.selectedTypes = resp.data.type;
        this.publish_dates = this.advt_record.publish_dates.map(d=>{
          let df = new Date(d.from_publish_date);
          let dt = new Date(d.to_publish_date);
          let month = df.getMonth()+1;
          return {
            // publish_date:df.toLocaleDateString(),
            publish_date:df.getFullYear()+"-"+(month<=9?'0'+month:month)+"-"+(df.getDate()<=9?'0'+df.getDate():df.getDate()),
          from_publish_time:(df.getHours()<=9?"0"+df.getHours():df.getHours())+":"+(df.getMinutes()<=9?"0"+df.getMinutes():df.getMinutes()),
          to_publish_time:(dt.getHours()<=9?"0"+dt.getHours():dt.getHours())+":"+(dt.getMinutes()<=9?"0"+dt.getMinutes():dt.getMinutes())
        }});
        this.onSelectCountry(+this.advt_record.country_id);
        this.onSelectState(+this.advt_record.state_id);
        this.onSelectDistrict(+this.advt_record.district_id);
        
        console.log(this.publish_dates );
      },(err)=>{

      });
  }

    this.advtService.getClient().subscribe(data => {
      this.clients = data;
    });

    this.commonService.getCountryDetails().subscribe(countryList => {
      localStorage.setItem('countryDetails', JSON.stringify(countryList));
      this.onSelectCountry(this.selectedCountry);
    });

    this.commonService.getStateDetails().subscribe(statesList => {
      localStorage.setItem("stateDetail", JSON.stringify(statesList));
    });

    this.commonService.getDistrictDetails().subscribe(districtList => {
      localStorage.setItem('districtDetails', JSON.stringify(districtList));
    })

    this.commonService.getCitiesDetails().subscribe(cityList => {
      localStorage.setItem("cityDetails", JSON.stringify(cityList));
    });

    this.commonService.getBlock().subscribe(data => {
      this.blocks = data;
    });
  }

  /*Audio Recording */
  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }

  

  /* Select Country */
  onSelectCountry(country_id: number) {
    this.selectedCountry = country_id;
    this.states = this.getStates().filter(item => {
      return item.country_id === Number(country_id);
    });
  }

  // onSelectState(state_id: number) {
  //   this.selectedState = state_id;
  //   this.selectedStateName = this.selectedState;
  //   this.cities = this.getCity().filter(item => {
  //     return item.state_id === Number(state_id);
  //   });
  // }

  getDistrict() {
    return JSON.parse(localStorage.getItem('districtDetails'));
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
    this.onSelectCity(+this.advt_record.city_id);
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

  selectBlockName() {
    console.log("abc");
    
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

  onSubmit(data1) {
    let data = {...data1};
    let publish_dates = [];
    publish_dates = this.publish_dates.map((publish_date) =>{
      let d1 = new Date(publish_date.publish_date+" "+publish_date.from_publish_time+":00");
      let d2 = new Date(publish_date.publish_date+" "+publish_date.to_publish_time+":00");
    return ({
      from_publish_date:d1.toISOString(),
      to_publish_date:d2.toISOString()
    });
    });

    if(!publish_dates.every(publish_date=>{
      let d1 = new Date(publish_date.from_publish_date);
      let d2 = new Date(publish_date.to_publish_date);
      if(d1.toString() == "Invalid Date" || d1.getFullYear() <= 2018){
        alert('Invalid Date');
        return false;
      }
      if(d2.toString() == "Invalid Date" ||  d1.getFullYear() <= 2018){
        alert('Invalid Date');
        return false;
      }
     
      return true;
    })){
      return;
    }
    data.type = this.selectedTypes;
    data.publish_dates = publish_dates;
    let fileName = null;
    let fileExt = null;
    let baseString = null;
    if(this.audioBase64){
        let tmp = this.audioBase64.split(",");
        baseString = tmp[1];
        fileExt = tmp[0].split(";")[0].split("/")[1];
        let d = new Date();
        fileName = 'Audio'+d.getTime();
        data.voiceFileExt = fileExt;
        data.voiceFileName = fileName;
    }
    data.voiceData = baseString;

     if(this.editMode) {
      this.advt_record.voiceData = baseString;
      this.advt_record.type = this.selectedTypes;
      this.advt_record.voiceFileName = fileName;
      this.advt_record.voiceFileExt = fileExt;
      this.advt_record.publish_dates = publish_dates;
       this.advtService.updateAdvtDetails(this.advt_record, this.advt_record.advt_id).subscribe(data => {
        console.log("updated");
        this.location.back();
        // this.router.navigateByUrl("/super-admin-dashboard/advt-details-list")
       })
     } 
     else {
      this.advtService.addAdvtDetails(data).subscribe(data => {
      console.log('added successfully');
      this.location.back();
      // this.router.navigateByUrl("/super-admin-dashboard/advt-details-list")

    });
  }
}

handleFileSelect(evt) {
  const files = evt.target.files;
  const file = files[0];
  if (files && file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload =  () =>{
      this.audioBase64 =  reader.result;
    };
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

  removePubDate(index){
    if(this.publish_dates.length == 1){
      return;
    }
    this.publish_dates = this.publish_dates.splice(index,1);
  }

  addPubDate(){
    this.publish_dates.push({
      from_publish_date:new Date(),
      to_publish_date:new Date()
    });
  }
}
