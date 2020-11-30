import { Component, OnInit, NgModule } from '@angular/core';

@Component({
  selector: 'app-enforcer',
  templateUrl: './enforcer.component.html',
  styleUrls: ['./enforcer.component.css']
})
export class EnforcerComponent implements OnInit {

  searchRes;
  res = [
    { 
      distance: 0.0,
      address: "123 fuck you",
      rate: 4.0,
      capacity: 10,
      avail: 10,
      reserve: 10,
      unavail: 10,
      handi: 10,
      p_lot: 10
    }
  ]


  constructor() { }

  ngOnInit() {
  }
  
}
