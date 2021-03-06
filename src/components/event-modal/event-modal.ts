import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';
import moment from 'moment';

@Component({selector: 'event-modal', templateUrl: 'event-modal.html'})
export class EventModalComponent {

  showError: boolean;
  datePickerVal: string;

  event = {
    date: {
      day: "",
      month: "",
      year: ""
    },
    title: "",
    location: "",
    time: "",
    contact: ""
  }

  constructor(public viewCtrl : ViewController) {
    this.showError = false;
  }

  submitEventForm() {
    let date = moment(this.datePickerVal).format("DD-MMM-YYYY");

    if (this.datePickerVal != "" && this.event.title != "" && this.event.location != "" && this.event.time != "" && this.event.contact != "") {
      
      this.showError = false;

      this.event.date = {
        day: this.datePickerVal.split("-")[2],
        month: date.split("-")[1],
        year: this.datePickerVal.split("-")[0],
      }

      this
        .viewCtrl
        .dismiss({"event": this.event});
    }else{
      this.showError = true;
    }
  }

  close() {
    this
      .viewCtrl
      .dismiss({"action":"cancel"});
  }

}

export class Event {
  constructor() {}
}