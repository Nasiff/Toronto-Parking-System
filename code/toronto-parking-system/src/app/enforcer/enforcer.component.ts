import { Component, OnInit, NgModule } from '@angular/core';
import { EnforcerService } from '../services/enforcer.service';
import { Subscription } from ‘rxjs’;

@Component({
  selector: 'app-enforcer',
  templateUrl: './enforcer.component.html',
  styleUrls: ['./enforcer.component.css']
})
export class EnforcerComponent implements OnInit {

  searchRes;
  res: any;


  constructor(
    private enfServ: EnforcerService
  ) {

  }

  ngOnInit() {
    this.enfServ.getAllParkings().subscribe((results) => {
      this.res = results
    });
  }
  
}
