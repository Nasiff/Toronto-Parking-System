import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

=======
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
>>>>>>> c9dfe75abbbe18d30b65fdf88703d76e41e33530

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

<<<<<<< HEAD
  parkings = [
    {
        parkingId: "p-1",
        distance: "0.5",
        address: "101 Lassonde Street",
        price: 4,
        isOpen: true,
        availabilities : [
          {
            availableFromDay: "Monday",
            availableToDay: "Friday",
            availableFromTime: "09:00",
            availableToTime: "17:00"
          }
        ],
        freeAvailabilities : [
          {
            availableFromDay: "Friday",
            availableToDay: "Friday",
            availableFromTime: "17:00",
            availableToTime: "23:59"
          }
        ],
        lots: [
            {
                lotNumber: 1,
                isHandicapped: false,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            },
            {
                lotNumber: 2,
                isHandicapped: false,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            },                {
                lotNumber: 3,
                isHandicapped: false,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            },                {
                lotNumber: 4,
                isHandicapped: false,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            },
            {
                lotNumber: 5,
                isHandicapped: true,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            }
        ]
    },
    {
        parkingId: "p-2",
        distance: "0.5",
        address: "233 Bethune Street",
        price: 2.90,
        isOpen: true,
        availabilities : [
          {
            availableFromDay: "Monday",
            availableToDay: "Friday",
            availableFromTime: "09:00",
            availableToTime: "17:00"
          }
        ],
        freeAvailabilities : [
          {
            availableFromDay: "Friday",
            availableToDay: "Friday",
            availableFromTime: "17:00",
            availableToTime: "23:59"
          }
        ],
        lots: [
            {
                lotNumber: 1,
                isHandicapped: false,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            },
            {
                lotNumber: 2,
                isHandicapped: false,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            },                {
                lotNumber: 3,
                isHandicapped: false,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            },                {
                lotNumber: 4,
                isHandicapped: true,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            },
            {
                lotNumber: 5,
                isHandicapped: true,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            }
        ]
    },
    {
        parkingId: "p-3",
        distance: "0.5",
        address: "404 York Boulevard",
        price: 5,
        isOpen: true,
        availabilities : [
          {
            availableFromDay: "Monday",
            availableToDay: "Friday",
            availableFromTime: "09:00",
            availableToTime: "17:00"
          }
        ],
        freeAvailabilities : [
          {
            availableFromDay: "Friday",
            availableToDay: "Friday",
            availableFromTime: "17:00",
            availableToTime: "23:59"
          }
        ],
        lots: [
            {
                lotNumber: 1,
                isHandicapped: false,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            },
            {
                lotNumber: 2,
                isHandicapped: false,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            },                {
                lotNumber: 3,
                isHandicapped: true,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            },                {
                lotNumber: 4,
                isHandicapped: false,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            },
            {
                lotNumber: 5,
                isHandicapped: true,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            }
        ]
    },
    {
        parkingId: "p-4",
        distance: "0.5",
        address: "99 Bergeron Lane",
        price: 5,
        isOpen: true,
        availabilities : [
          {
            availableFromDay: "Monday",
            availableToDay: "Friday",
            availableFromTime: "09:00",
            availableToTime: "17:00"
          }
        ],
        freeAvailabilities : [
          {
            availableFromDay: "Friday",
            availableToDay: "Friday",
            availableFromTime: "17:00",
            availableToTime: "23:59"
          }
        ],
        lots:[
            {
                lotNumber: 1,
                isHandicapped: true,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            },
            {
                lotNumber: 2,
                isHandicapped: false,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            },                {
                lotNumber: 3,
                isHandicapped: false,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            },                {
                lotNumber: 4,
                isHandicapped: false,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            },
            {
                lotNumber: 5,
                isHandicapped: true,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            }
        ]
    },
    {
        parkingId: "p-5",
        distance: "0.5",
        address: "502 Schulich Drive",
        price: 4,
        isOpen: true,
        availabilities : [
          {
            availableFromDay: "Monday",
            availableToDay: "Friday",
            availableFromTime: "09:00",
            availableToTime: "17:00"
          }
        ],
        freeAvailabilities : [
          {
            availableFromDay: "Friday",
            availableToDay: "Friday",
            availableFromTime: "17:00",
            availableToTime: "23:59"
          }
        ],
        lots:[
            {
                lotNumber: 1,
                isHandicapped: false,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            },
            {
                lotNumber: 2,
                isHandicapped: false,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            },                {
                lotNumber: 3,
                isHandicapped: false,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            },                {
                lotNumber: 4,
                isHandicapped: true,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            },
            {
                lotNumber: 5,
                isHandicapped: true,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            }
        ]
    },
    {
        parkingId: "p-6",
        distance: "0.5",
        address: "420 Engineering Avenue",
        price: 3.50,
        isOpen: true,
        availabilities : [
          {
            availableFromDay: "Monday",
            availableToDay: "Friday",
            availableFromTime: "09:00",
            availableToTime: "17:00"
          }
        ],
        freeAvailabilities : [
          {
            availableFromDay: "Friday",
            availableToDay: "Friday",
            availableFromTime: "17:00",
            availableToTime: "23:59"
          }
        ],
        lots: [
            {
                lotNumber: 1,
                isHandicapped: true,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            },
            {
                lotNumber: 2,
                isHandicapped: false,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            },                {
                lotNumber: 3,
                isHandicapped: false,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            },                {
                lotNumber: 4,
                isHandicapped: false,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            },
            {
                lotNumber: 5,
                isHandicapped: false,
                isAvailable: true,
                dateReserved: "",
                timeReserved: "",
                duration: "",
                bookedBy: ""
            }
        ]
    }
]
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
  locationF: string;
  priceF: string;
  distanceF: string;

  showMore: boolean = true;
  confirmBooking : boolean = false;

  confirmParkingA: string;
  confirmParkingB: string;
  confirmParkingC: string;
  confirmParkingD: string;
  confirmParkingE: string;
  confirmParkingF: string;

  confirmLocation: string

  paidStartD: string
  paidEndD: string
  paidStartT: string
  paidEndT: string

  freeStartD: string
  freeEndD: string
  freeStartT: string
  freeEndT: string
  parkingLot: string
  
  constructor(
    private router: Router
  ) {
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
      this.locationF = '420 Engineering Avenue';
      this.priceF = 'Rate: $3.50/ 1/2 Hr';
      this.distanceF = '0.5 KM Away';

      this.confirmParkingA = "Confirm Parking for 101 Lassonde Street";
      this.confirmParkingB = "Confirm Parking for 233 Bethune Street";
      this.confirmParkingC = "Confirm Parking for 404 York Boulevard";
      this.confirmParkingD = "Confirm Parking for 99 Bergeron Lane";
      this.confirmParkingE = "Confirm Parking for 502 Schulich Drive";
      this.confirmParkingF = "Confirm Parking for 420 Engineering Avenue";
   };

   ngOnInit (){

   };

   toggleA(){
=======
  ngOnInit() { }

  toggleA(){ //distance
    console.log("toggling a");
>>>>>>> c9dfe75abbbe18d30b65fdf88703d76e41e33530
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
<<<<<<< HEAD
    this.locationF = '420 Engineering Avenue';
    this.priceF = 'Rate: $3.50/ 1/2 Hr';
    this.distanceF = '0.5 KM Away';

    this.confirmParkingA = "Confirm Parking for 101 Lassonde Street";
    this.confirmParkingB = "Confirm Parking for 233 Bethune Street";
    this.confirmParkingC = "Confirm Parking for 404 York Boulevard";
    this.confirmParkingD = "Confirm Parking for 99 Bergeron Lane";
    this.confirmParkingE = "Confirm Parking for 502 Schulich Drive";
    this.confirmParkingE = "Confirm Parking for 420 Engineering Avenue";
   }

   toggleB(){
    this.locationA = '233 Bethune Street';
    this.priceA = 'Rate: $2.90/ 1/2 Hr';
    this.distanceA = '0.5 KM Away';
    this.locationB = '420 Engineering Avenue';
    this.priceB = 'Rate: $3.50/ 1/2 Hr';
    this.distanceB = '0.5 KM Away';
    this.locationC = '101 Lassonde Street';
    this.priceC = 'Rate: $4.00/ 1/2 Hr'
    this.distanceC = '0.5 KM Away';
    this.locationD = '502 Schulich Drive';
    this.priceD = 'Rate: $4.00/ 1/2 Hr';
    this.distanceD = '0.5 KM Away';
    this.locationE = '404 York Boulevard';
    this.priceE = 'Rate: $5.00/ 1/2 Hr';
    this.distanceE = '0.5 KM Away';
    this.locationF = '99 Bergeron Lane';
    this.priceF = 'Rate: $5.00/ 1/2 Hr';
    this.distanceF = '0.5 KM Away';

    this.confirmParkingA = "Confirm Parking for 233 Bethune Street";
    this.confirmParkingB = "Confirm Parking for 420 Engineering Avenue";
    this.confirmParkingC = "Confirm Parking for 101 Lassonde Street";
    this.confirmParkingD = "Confirm Parking for 502 Schulich Drive";
    this.confirmParkingE = "Confirm Parking for 404 York Boulevard";
    this.confirmParkingF = "Confirm Parking for 99 Bergeron Lane";
    
   }

   searchById(id){
    if (id === ""){
      this.showMore = true;

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

      this.confirmParkingA = "Confirm Parking for 101 Lassonde Street";
      this.confirmParkingB = "Confirm Parking for 233 Bethune Street";
      this.confirmParkingC = "Confirm Parking for 404 York Boulevard";
      this.confirmParkingD = "Confirm Parking for 99 Bergeron Lane";
      this.confirmParkingE = "Confirm Parking for 502 Schulich Drive";
    }
    else if (id === "101 Lassonde Street"){ //A
      this.locationA = '101 Lassonde Street';
      this.priceA = 'Rate: $4.00/ 1/2 Hr'
      this.distanceA = '0.5 KM Away';
      this.confirmParkingA = "Confirm Parking for 101 Lassonde Street";
      this.showMore = !this.showMore;
    }
    else if (id === "233 Bethune Street"){ //B
      this.locationA = '233 Bethune Street';
      this.priceA = 'Rate: $2.90/ 1/2 Hr';
      this.distanceA = '0.5 KM Away';
      this.confirmParkingA = "Confirm Parking for 233 Bethune Street";
      this.showMore = !this.showMore;
    }
    else if (id === "404 York Boulevard"){ //C
      this.locationA = '404 York Boulevard';
      this.priceA = 'Rate: $5.00/ 1/2 Hr';
      this.distanceA = '0.5 KM Away';
      this.confirmParkingA = "Confirm Parking for 404 York Boulevard";
      this.showMore = !this.showMore;
    }
    else if (id === "99 Bergeron Lane"){ //D
      this.locationA = '99 Bergeron Lane';
      this.priceA = 'Rate: $5.00/ 1/2 Hr';
      this.distanceA = '0.5 KM Away';
      this.confirmParkingA = "Confirm Parking for 99 Bergeron Lane";
      this.showMore = !this.showMore;
    }
    else if (id === "502 Schulich Drive"){ //E
      this.locationA = '502 Schulich Drive';
      this.priceA = 'Rate: $4.00/ 1/2 Hr';
      this.distanceA = '0.5 KM Away';
      this.confirmParkingA = "Confirm Parking for 502 Schulich Drive";
      this.showMore = !this.showMore;
    }

    else if (id === "420 Engineering Avenue"){ //F
      this.locationA = '420 Engineering Avenue';
      this.priceA = 'Rate: $3.50/ 1/2 Hr';
      this.distanceA = '0.5 KM Away';
      this.confirmParkingA = "Confirm Parking for 420 Engineering Avenue";
      this.showMore = !this.showMore;
    }
   }

   confirmParking(locationID){
      this.confirmBooking = !this.confirmBooking;
      this.confirmLocation = locationID;

      if (locationID === "101 Lassonde Street"){
        this.parkingLot = this.parkings[0].parkingId
        this.paidStartD = this.parkings[0].availabilities[0].availableFromDay
        this.paidEndD = this.parkings[0].availabilities[0].availableToDay
        this.paidStartT = this.parkings[0].availabilities[0].availableFromTime
        this.paidEndT = this.parkings[0].availabilities[0].availableToTime

        this.freeStartD = this.parkings[0].freeAvailabilities[0].availableFromDay
        this.freeEndD = this.parkings[0].freeAvailabilities[0].availableToDay
        this.freeStartT = this.parkings[0].freeAvailabilities[0].availableFromTime
        this.freeEndT = this.parkings[0].freeAvailabilities[0].availableToTime
      }
      else if (locationID === "233 Bethune Street"){
        this.parkingLot = this.parkings[1].parkingId
        this.paidStartD = this.parkings[1].availabilities[0].availableFromDay
        this.paidEndD = this.parkings[1].availabilities[0].availableToDay
        this.paidStartT = this.parkings[1].availabilities[0].availableFromTime
        this.paidEndT = this.parkings[1].availabilities[0].availableToTime

        this.freeStartD = this.parkings[1].freeAvailabilities[0].availableFromDay
        this.freeEndD = this.parkings[1].freeAvailabilities[0].availableToDay
        this.freeStartT = this.parkings[1].freeAvailabilities[0].availableFromTime
        this.freeEndT = this.parkings[1].freeAvailabilities[0].availableToTime
      }
      else if (locationID === "404 York Boulevard"){
        this.parkingLot = this.parkings[2].parkingId
        this.paidStartD = this.parkings[2].availabilities[0].availableFromDay
        this.paidEndD = this.parkings[2].availabilities[0].availableToDay
        this.paidStartT = this.parkings[2].availabilities[0].availableFromTime
        this.paidEndT = this.parkings[2].availabilities[0].availableToTime

        this.freeStartD = this.parkings[2].freeAvailabilities[0].availableFromDay
        this.freeEndD = this.parkings[2].freeAvailabilities[0].availableToDay
        this.freeStartT = this.parkings[2].freeAvailabilities[0].availableFromTime
        this.freeEndT = this.parkings[2].freeAvailabilities[0].availableToTime
      }
      else if (locationID === "99 Bergeron Lane"){
        this.parkingLot = this.parkings[3].parkingId
        this.paidStartD = this.parkings[3].availabilities[0].availableFromDay
        this.paidEndD = this.parkings[3].availabilities[0].availableToDay
        this.paidStartT = this.parkings[3].availabilities[0].availableFromTime
        this.paidEndT = this.parkings[3].availabilities[0].availableToTime

        this.freeStartD = this.parkings[3].freeAvailabilities[0].availableFromDay
        this.freeEndD = this.parkings[3].freeAvailabilities[0].availableToDay
        this.freeStartT = this.parkings[3].freeAvailabilities[0].availableFromTime
        this.freeEndT = this.parkings[3].freeAvailabilities[0].availableToTime
      }
      else if (locationID === "502 Schulich Drive"){
        this.parkingLot = this.parkings[4].parkingId
        this.paidStartD = this.parkings[4].availabilities[0].availableFromDay
        this.paidEndD = this.parkings[4].availabilities[0].availableToDay
        this.paidStartT = this.parkings[4].availabilities[0].availableFromTime
        this.paidEndT = this.parkings[4].availabilities[0].availableToTime

        this.freeStartD = this.parkings[4].freeAvailabilities[0].availableFromDay
        this.freeEndD = this.parkings[4].freeAvailabilities[0].availableToDay
        this.freeStartT = this.parkings[4].freeAvailabilities[0].availableFromTime
        this.freeEndT = this.parkings[4].freeAvailabilities[0].availableToTime
      }

      else if (locationID === "420 Engineering Avenue"){
        this.parkingLot = this.parkings[5].parkingId
        this.paidStartD = this.parkings[5].availabilities[0].availableFromDay
        this.paidEndD = this.parkings[5].availabilities[0].availableToDay
        this.paidStartT = this.parkings[5].availabilities[0].availableFromTime
        this.paidEndT = this.parkings[5].availabilities[0].availableToTime

        this.freeStartD = this.parkings[5].freeAvailabilities[0].availableFromDay
        this.freeEndD = this.parkings[5].freeAvailabilities[0].availableToDay
        this.freeStartT = this.parkings[5].freeAvailabilities[0].availableFromTime
        this.freeEndT = this.parkings[5].freeAvailabilities[0].availableToTime
      }
    }

    clearParking(){
      window.location.reload();
    }

  }
=======
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
>>>>>>> c9dfe75abbbe18d30b65fdf88703d76e41e33530
