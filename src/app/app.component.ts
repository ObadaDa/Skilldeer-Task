import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Item } from './event/event.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  private BASE_URL = "https://skilldeer.com/calendar/list";
  public weekStartDate;
  public weekEndDate;

  public sundayList = [];
  public mondayList = [];
  public tusdayList = [];
  public wednesdayList = [];
  public thursdayList = [];
  public fridayList = [];
  public saturdayList = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(){
    this.init();
  }

  init(startDate = new Date()) {
    this.sundayList = [];
    this.mondayList = [];
    this.tusdayList = [];
    this.wednesdayList = [];
    this.thursdayList = [];
    this.fridayList = [];
    this.saturdayList = [];
    this.getUrlWithParams(startDate);

    this.http.get(this.getUrlWithParams(startDate)).subscribe((items: Item[]) => {
      items.forEach(item => {
        item.verticalOffset = this.getMargen(item);
        item.duration = this.getDuration(item);
        switch(new Date(item.start).getDay()) {
          case 0:
            this.sundayList[this.sundayList.length] = item;
            break;
          case 1:
            this.mondayList[this.mondayList.length] = item;
            break;
          case 2:
            this.tusdayList[this.tusdayList.length] = item;
            break;
          case 3:
            this.wednesdayList[this.wednesdayList.length] = item;
            break;
          case 4:
            this.thursdayList[this.thursdayList.length] = item;
            break;
          case 5:
            this.fridayList[this.fridayList.length] = item;
            break;
          case 6:
            this.saturdayList[this.saturdayList.length] = item;
            break;
        }
      });
    });
  }

  getUrlWithParams(startDate: Date) {
    
    let lastSunday = startDate.getDate() - startDate.getDay();

    this.weekStartDate = [startDate.getFullYear(), startDate.getMonth() + 1, lastSunday].join('-');

    let endDay = lastSunday + 6;
    if(endDay > this.getDaysInMonth(startDate))
      endDay -= this.getDaysInMonth(startDate);

    let endMonth = endDay < startDate.getDate()? startDate.getMonth()+2 : startDate.getMonth()+1;
    let endYear = startDate.getFullYear();
    if(endMonth > 12){
      endYear += 1
      endMonth -= 12;
    }

    

    this.weekEndDate = [endYear, endMonth, endDay].join('-')
    return this.BASE_URL +
      '?start='
        +  this.weekStartDate
          + '&end='
            + this.weekEndDate
  }

  getDaysInMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
  };

  nextWeek() {
    let date = new Date(this.weekEndDate);
    let firstWeekDay = date.getDate() + 1;
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    if(firstWeekDay > this.getDaysInMonth(date)){
      firstWeekDay = this.getDaysInMonth(date) - firstWeekDay;
      month += 1;
    }

    if(month > 12){
      month -= 12;
      year += 1;
    }

    let newDate = new Date([year, month, firstWeekDay].join('-'));
    this.init(newDate);

    return [year, month- firstWeekDay].join('-');
  }

  prevWeek() {
    let date = new Date(this.weekStartDate);
    let firstWeekDay = date.getDate() - 7;
    let month = date.getMonth()+1;
    let year = date.getFullYear();

    if(firstWeekDay < 0) {
      firstWeekDay = this.getDaysInMonth(date) + firstWeekDay;
      month -= 1;
    }

    if(month < 1) {
      month = 12 - month;
      year -= 1;
    }

    let newDate = new Date([year, month, firstWeekDay].join('-'));
    this.init(newDate);
  }

  getMargen(event: Item) {
    let deg = 0;
    if(event){
      let startDate = new Date(event.start);
      let startTime = startDate.getHours() + 1;
      let startMinutes = (startDate.getMinutes()/60) * 24;
      deg = (startTime * 51) + startMinutes;
    }

    return deg + 'px';
  }

  getDuration(event: Item) {
    let startTime = new Date(event.start);
    let endTime = new Date(event.end);

    let endMinutes = (endTime.getMinutes()/60) * 51;

    return (((endTime.getHours() - startTime.getHours()) * 51) + endMinutes) + 'px';
  }
}
