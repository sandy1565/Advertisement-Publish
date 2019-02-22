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

export class AdvertisePublishComponent implements OnInit {
  constructor(private advertisepublishService: AdvertisePublishService, private commonService: CommonService) { }
  userSelectsString = '';
  age_as_per_advtPublishDate;
  selectedBlockId;
  blockId;
  show = false;
  userSelects = [];
  gender = ['Male', 'Female', 'Transgender'];
  genderModel = new Gender();
  textMessage;

  ngOnInit() {
  }

  
  getValue(e) {
    this.gender = e.target.value;
  }

  assignToNgModel() {
    this.userSelectsString = '';
    this.userSelects.map((item) => this.userSelectsString += item.locationName + ' ');
  }

  publishDetails(event, textMessage) {
    const publishModel = {};
    publishModel['gender'] = this.genderModel.gender;
    publishModel['text_message'] = textMessage;
    this.advertisepublishService.addPublish(publishModel).subscribe((data) => {
      console.log('======================', publishModel);
      console.log('Successfully added !');
    });
  }
}

