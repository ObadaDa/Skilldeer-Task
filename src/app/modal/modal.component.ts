import { Component, OnInit, Input} from '@angular/core';
import { Item } from '../event/event.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() event: Item;

  constructor() { }

  ngOnInit() {
  }

  getDate() {
    return this.event.start.split('T')[0];
  }

  getStart() {
    return this.event.start.split('T')[1].split('+')[0];
  }

  getEnd() {
    return this.event.end.split('T')[1].split('+')[0];
  }

}
