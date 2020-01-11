import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detail-component',
  templateUrl: './detail-component.component.html',
  styleUrls: ['./detail-component.component.css']
})
export class DetailComponentComponent implements OnInit {
  @Input() focusCake: any;
  @Input() focusCakeAverage: any;

  constructor() { }

  ngOnInit() {
  }

}
