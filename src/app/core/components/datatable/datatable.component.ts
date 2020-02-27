import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vrl-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  // valores recogidos desde el back
  @Input() config = [];
  @Input() header = [];
  @Input() data = [];
  @Input() footer = [];
  @Input() buttons = [];

  constructor() { }

  ngOnInit() {

  }


}
