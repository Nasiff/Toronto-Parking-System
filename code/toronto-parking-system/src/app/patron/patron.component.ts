import { formatDate } from '@angular/common';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatronService } from '../services/patron.service';
import { UserService } from '../services/user.service';

@Component({
  selector: "app-patron",
  templateUrl: "./patron.component.html",
  styleUrls: ["./patron.component.css"],
})
export class PatronComponent implements OnInit {
  parkings = [];
  bookingForm: FormGroup;
  isBookingView;

  searchRes;
  selectedParking;
  selectedLot;

  spotChoices = [];
  durationChoices = ["30 mins", "1 hour", "2 hours", "3 hours (Max)"]

  user;
  submittedData

  constructor(
    private formBuilder: FormBuilder,
    private userSvc: UserService,
    private patronSvc: PatronService
  ) {
    this.bookingForm = this.formBuilder.group({
      date: ["", Validators.required],
      time: ["", Validators.required],
      spot: ["", Validators.required],
      duration: ["", Validators.required]
    });

    this.patronSvc.getAllParkings();
    alert("Loading Parking Locations...");
    this.patronSvc.parkings.forEach(elem => {
      this.parkings.push(elem);
    });

    this.isBookingView = false;
    this.user = this.userSvc.getCurrentLoggedInUser();
  }

  ngOnInit() {}

  sortByDistance() {
    this.parkings.sort((a, b) => parseFloat(a.payload.distance) - parseFloat(b.payload.distance));
  }

  sortByPrice() {
    this.parkings.sort((a, b) => parseFloat(a.payload.price) - parseFloat(b.payload.price));
  }

  goBackToParkingView() {
    this.isBookingView = false;
  }

  openBookingForm(parking) {
    this.isBookingView = true;
    this.prepareParkingSummary(parking);
  }

  private prepareParkingSummary(parking) {
    const avail_obj = parking.payload.availabilities
    const free_obj = parking.payload.freeAvailabilities
    const lot_obj = parking.payload.lots

    let avail_arr = [];  
    let free_arr = [];  
    let lot_arr = [];  
    
    Object.keys(avail_obj).map(function(key){  
        avail_arr.push(avail_obj[key])  
        return avail_arr;  
    });  
    Object.keys(free_obj).map(function(key){  
      free_arr.push(free_obj[key])  
      return free_arr;  
    });  
    Object.keys(lot_obj).map(function(key){  
      lot_arr.push(lot_obj[key])  
      return lot_arr;  
    });

    this.selectedParking = parking;

    this.selectedParking.payload.availabilities = avail_arr
    this.selectedParking.payload.freeAvailabilities = free_arr    
    this.selectedParking.payload.lots = lot_arr

    this.selectedParking.payload.lots.forEach(e => {
      if (e.isAvailable) {
        this.spotChoices.push("#" + e.lotNumber + " | Available")
      } else if (!e.isAvailable && e.bookedBy === '') {
        this.spotChoices.push("#" + e.lotNumber + " | Closed")
      } else if (!e.isAvailable && e.bookedBy !== '') {
        this.spotChoices.push("#" + e.lotNumber + " | Reserved")
      }

      if (e.isHandicapped) {
        this.spotChoices[this.spotChoices.length - 1] = this.spotChoices[this.spotChoices.length - 1] + " - Handicapped"
      }
    });
  }

  changeSpot(e) {
    this.bookingForm.get("spot").setValue(e.target.value, {
      onlySelf: true,
    });

    if (this.bookingForm.get("spot").value.includes("Closed")) {
      alert("The selected parking spot is closed!")
      this.bookingForm.get("spot").setValue(null)
    } else if (this.bookingForm.get("spot").value.includes("Reserved")) {
      alert("The selected parking spot is reserved!")
      this.bookingForm.get("spot").setValue(null)
    } else {
      const indexOfHash = e.target.value.indexOf("#")
      const indexOfStick = e.target.value.indexOf("|")
      const lots = this.selectedParking.payload.lots;
      const lnumber = Number(e.target.value.substring(indexOfHash + 1, indexOfStick - 1));
      lots.forEach(elem => {
        if (elem.lotNumber === lnumber) {
          this.selectedLot = elem;
        }
      });
    }
  }

  changeDuration(e) {
    this.bookingForm.get("duration").setValue(e.target.value, {
      onlySelf: true,
    });
  }

  onCheckout(formData) {
    this.validateBooking(formData); 
  }

  onConfirm(formData) {
    try {
      this.selectedLot.bookedBy = this.user.payload.username
      this.selectedLot.dateReserved = new Date().getDate();
      this.selectedLot.timeReserved = new Date().getTime();
      this.selectedLot.isAvailable= false;
      this.patronSvc.updateParkingWithBooking(this.selectedParking.key, this.selectedParking.payload)
      alert("You have successfully booked! Please check your email for details")
    } catch (error) {
     alert("Patron Booking: " + error) 
    }
  }

  private validateBooking(formData) {
    if (this.user.payload.paymentType === "") {
      alert("Missing Payment Info! Please add a payment type in the profile page!")
    } else {
      this.calculatePayment(formData);
      this.submittedData = formData;
    }
  }

  private calculatePayment(formData) {
    const parkingCost = this.selectedParking.payload.price;

    if(formData.duration === this.durationChoices[0]) {
      formData.price = 0.5 * parkingCost;
      formData.tax = formData.price * 0.1
      formData.total = formData.price + formData.tax
    } else if (formData.duration === this.durationChoices[1]) {
      formData.price = 1 * parkingCost;
      formData.tax = formData.price * 0.1
      formData.total = formData.price + formData.tax
    } else if (formData.duration === this.durationChoices[2]) {
      formData.price = 2 * parkingCost;
      formData.tax = formData.price * 0.1
      formData.total = formData.price + formData.tax
    } else {
      formData.price = 3 * parkingCost;
      formData.tax = formData.price * 0.1
      formData.total = formData.price + formData.tax
    }
  }
}
