import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input() events: Item[];

  constructor() { }

  ngOnInit() {
  }

  moveToURL(url: string) {
    window.location.href = url;
  }

}

export interface Item {
  color: string;
  end: string;
  id: number;
  photo: string;
  start: string;
  title: string;
  url: string;
  duration: string;
  verticalOffset: string;
  showModal: boolean;
  numberOfOverlaps: number;
}
