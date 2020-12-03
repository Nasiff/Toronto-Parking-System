import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-patron',
  templateUrl: './patron.component.html',
  styleUrls: ['./patron.component.css']
})
export class PatronComponent implements OnInit {
  patron: FormGroup;
  orderChanged: boolean = false;
  loading: boolean = false;
  locationA: string;
  priceA: string;
  distanceA: string;
  locationB: string;
  priceB: string;
  distanceB: string;
  locationC: string;
  priceC: string;
  distanceC: string;
  locationD: string;
  priceD: string;
  distanceD: string;
  locationE: string;
  priceE: string;
  distanceE: string;
  
  constructor(
    private router: Router
  ) {
    // this.locationA = '101 Lassonde Street';
      // this.priceA = 'Rate: $4.00/ 1/2 Hr'
      // this.distanceA = '0.5 KM Away';
      // this.locationB = '233 Bethune Street';
      // this.priceB = 'Rate: $2.90/ 1/2 Hr';
      // this.distanceB = '0.5 KM Away';
      // this.locationC = '404 York Boulevard';
      // this.priceC = 'Rate: $5.00/ 1/2 Hr';
      // this.distanceC = '0.5 KM Away';
      // this.locationD = '99 Bergeron Lane';
      // this.priceD = 'Rate: $5.00/ 1/2 Hr';
      // this.distanceD = '0.5 KM Away';
      // this.locationE = '502 Schulich Drive';
      // this.priceE = 'Rate: $4.00/ 1/2 Hr';
      // this.distanceE = '0.5 KM Away';
   };

  ngOnInit() { }

  toggleA(){ //distance
    console.log("toggling a");
    this.locationA = '101 Lassonde Street';
    this.priceA = 'Rate: $4.00/ 1/2 Hr'
    this.distanceA = '0.5 KM Away';
    this.locationB = '233 Bethune Street';
    this.priceB = 'Rate: $2.90/ 1/2 Hr';
    this.distanceB = '0.5 KM Away';
    this.locationC = '404 York Boulevard';
    this.priceC = 'Rate: $5.00/ 1/2 Hr';
    this.distanceC = '0.5 KM Away';
    this.locationD = '99 Bergeron Lane';
    this.priceD = 'Rate: $5.00/ 1/2 Hr';
    this.distanceD = '0.5 KM Away';
    this.locationE = '502 Schulich Drive';
    this.priceE = 'Rate: $4.00/ 1/2 Hr';
    this.distanceE = '0.5 KM Away';
  }

  toggleB(){ //by price
    console.log("toggling b");
    this.locationA = '233 Bethune Street';
    this.priceA = 'Rate: $2.90/ 1/2 Hr'
    this.distanceA = '0.5 KM Away';
    this.locationB = '101 Lassonde Street';
    this.priceB = 'Rate: $4.00/ 1/2 Hr';
    this.distanceB = '0.5 KM Away';
    this.locationC = '502 Schulich Drive';
    this.priceC = 'Rate: $4.00/ 1/2 Hr';
    this.distanceC = '0.5 KM Away';
    this.locationD = '404 York Boulevard';
    this.priceD = 'Rate: $5.00/ 1/2 Hr';
    this.distanceD = '0.5 KM Away';
    this.locationE = '99 Bergeron Lane';
    this.priceE = 'Rate: $5.00/ 1/2 Hr';
    this.distanceE = '0.5 KM Away';

  }
  confirmParking($myParam: string = ''): void {
    const navigationDetails: string[] = ['/'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }
}
