import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-boolean-search',
  templateUrl: './boolean-search.component.html',
  styleUrls: ['./boolean-search.component.scss']
})
export class BooleanSearchComponent implements OnInit {
  @Input()
height=0;
@Output()
closePop = new EventEmitter<boolean>()
  constructor() { }

  ngOnInit(): void {
    // this.height = window.innerHeight-202

  }
  closePops() {
    this.closePop.emit(false)
  }
}
