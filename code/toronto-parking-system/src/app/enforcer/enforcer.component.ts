import { Component, OnInit, NgModule } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NumberValueAccessor, Validators } from '@angular/forms';
import { EnforcerService } from '../services/enforcer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-enforcer',
  templateUrl: './enforcer.component.html',
  styleUrls: ['./enforcer.component.css']
})
export class EnforcerComponent implements OnInit {

  searchRes: any;
  selectedLot: any[];
  parkings = []
  selectedParking: any;
  selectedKey: any;
  parkingForm: FormGroup;
  detailedLotView: any;
  view: number;

  private parkingsCopy = []

  constructor(
    private fb: FormBuilder,
    private enfServ: EnforcerService
  ) {
    this.view = 0;
    this.parkingForm = this.fb.group({
      opTimes: this.fb.array([]),
      capacity: [Number, Validators.required],
      toClose: this.fb.array([]),
      toHandi: this.fb.array([]),
      freeTimes: this.fb.array([]),
      price: [Number, Validators.required]
    });

    this.parkings = this.enfServ.parkings
    this.parkingsCopy = this.parkings
    alert("Loading parkings...")
    
  }

  ngOnInit() {
    
  }

  sortByDistance() {
    this.parkings.sort((a, b) => parseFloat(a.payload.distance) - parseFloat(b.payload.distance));
  }

  sortByPrice() {
    this.parkings.sort((a, b) => parseFloat(a.payload.price) - parseFloat(b.payload.price));
  }


  private compareStrings(a: String, b: String) {
    // console.log(a, b);
    // a = a.toLowerCase();
    // b = b.toLowerCase();
  
    // return (a < b) ? -1 : (a > b) ? 1 : 0;
    return 1;
  }

  isSafe(){
    if (this.enfServ == null)
      return false
    else
      return true
  }

  openLotDetails(lot: { [x: string]: any; }) {
    let lot_arr = [];  
    Object.keys(lot).map(function(key){  
        lot_arr.push(lot[key])  
        return lot_arr;  
    });  
    this.selectedLot = lot_arr
    console.log("selectedLot", this.selectedLot)
    this.view = 1;
   
  }

  openParkingEditor(payload: any) {
    const park = payload.payload
    this.selectedKey = payload.key

    const avail_obj = park.availabilities
    const free_obj = park.freeAvailabilities
    const lot_obj = park.lots

    let avail_arr = [];  
    let free_arr = [];  
    let lot_arr = [];  

    console.log(avail_obj);
    console.log(free_obj);
    console.log(lot_obj);

    if (avail_obj) {
      Object.keys(avail_obj).map(function(key){  
          avail_arr.push(avail_obj[key])  
          return avail_arr;  
      });  
    }

    if (free_obj) {
      Object.keys(free_obj).map(function(key){  
        free_arr.push(free_obj[key])  
        return free_arr;  
      });  
    }

    if (lot_obj) {
      Object.keys(lot_obj).map(function(key){  
        lot_arr.push(lot_obj[key])  
        return lot_arr;  
      });  
    }
    
    this.selectedParking = park;
    this.selectedParking.availabilities = avail_arr
    this.selectedParking.freeAvailabilities = free_arr    
    this.selectedParking.lots = lot_arr
    this.view = 2;
    this.setFormFields(this.selectedParking);
  }

  toggleParkingLotStatus(parking) {
    if (parking.payload.isOpen == true) {
      parking.payload.isOpen = false;
    } else {
      parking.payload.isOpen = true;
    }

    this.enfServ.updateParking(parking.key, parking.payload)
  }

  goToParkingListView() {
    this.view = 0;
    this.selectedParking = null;
    this.selectedLot = null;
  }

  private disableFormFields() {
    this.parkingForm.get("opTimes").disable();
    this.parkingForm.get("capacity").disable();
    this.parkingForm.get("toClose").disable();
    this.parkingForm.get("toHandi").disable();
    this.parkingForm.get("price").disable();
    this.parkingForm.get("freeTimes").disable();
  }

  private setFormFields(selectedParking) {
    this.setOpFields(selectedParking)
    this.setFreeFields(selectedParking)
    this.setToClose(selectedParking)
    this.setToHandi(selectedParking)
  
    this.parkingForm.get("capacity").setValue(selectedParking.lots.length)
    this.parkingForm.get("price").setValue(selectedParking.price)
   
  }

  private setOpFields(selectedParking){
    selectedParking.availabilities.forEach(element => {
      this.addOpAvail(
        element.availableFromDay,
        element.availableToDay,
        element.availableFromTime,
        element.availableToTime  
      )
    });
  }

  private setFreeFields(selectedParking){
    selectedParking.freeAvailabilities.forEach(element => {
      this.addFreeAvail(
        element.availableFromDay,
        element.availableToDay,
        element.availableFromTime,
        element.availableToTime  
      )
    });
  }

  private setToClose(selectedParking){
    selectedParking.lots.forEach(element => {
      if (!element.isAvailable){
        this.addToClose(
          element.lotNumber
        )
      }
    });
  }
  
  private setToHandi(selectedParking){
    selectedParking.lots.forEach(element => {
      if (element.isHandicapped){
        this.addToHandi(
          element.lotNumber
        )
      }
    });
  }

  newLotNumber(n): FormGroup {
    return this.fb.group({
      lotNumber: n
    })
  }

  validDates(afd, atd){
    return true;
  }

  validTimes(aft, att){
    return true;
  }

  newAvail(afd, atd, aft, att): FormGroup {
    return this.fb.group({
         availableFromDay: afd,
         availableToDay: atd,
         availableFromTime: aft,
         availableToTime: att
    })
  }
  
  get getOpTimes() : FormArray {
    return this.parkingForm.get("opTimes") as FormArray
  }

  get getFreeTimes() : FormArray {
    return this.parkingForm.get("freeTimes") as FormArray
  }

  get getToClose(){
    return this.parkingForm.get("toClose") as FormArray
  }
  
  get getToHandi(){
    return this.parkingForm.get("toHandi") as FormArray
  }

  addOpAvail(afd, atd, aft, att) {
    if(this.validDates(afd, atd)){
      if(this.validTimes(aft, att)){
        this.getOpTimes.push(this.newAvail(afd, atd, aft, att));
      }
    }
  }

  addFreeAvail(afd, atd, aft, att) {
    if(this.validDates(afd, atd)){
      if(this.validTimes(aft, att)){
        this.getFreeTimes.push(this.newAvail(afd, atd, aft, att));
      }
    }
  }

  addToClose(n) {
    this.getToClose.push(this.newLotNumber(n));
  }

  addToHandi(n) {
    this.getToHandi.push(this.newLotNumber(n));
  }

  newOpAvail(){
    this.addOpAvail("","", null, null)
  }

  newFreeAvail(){
    this.addFreeAvail("","", null, null)
  }

  newToClose() {
    this.addToClose(null);
  }

  newToHandi() {
    this.addToHandi(null);
  }

  remOpAvail(i){
    this.getOpTimes.removeAt(i)
  }

  remFreeAvail(i){
    this.getFreeTimes.removeAt(i)
  }

  remToClose(i) {
    this.getToClose.removeAt(i)
  }

  remToHandi(i) {
    this.getToHandi.removeAt(i)
  }
  submitChanges(){
    const changes = this.parkingForm.value
    this.prepChanges(changes)
    
    this.enfServ

    alert("Edit successful.")
  }

  prepChanges(changes){
    const new_capacity = changes.capacity
    const new_freeTimes = changes.freeTimes
    const new_opTimes = changes.opTimes
    const new_price = changes.price
    const new_toClose = changes.toClose
    const new_toHandi = changes.toHandi

    this.selectedParking.availabilities = new_opTimes
    this.selectedParking.freeAvailabilities = new_freeTimes
    this.selectedParking.price = new_price


    new_toClose.forEach(e1 => {
      const id = e1.lotNumber
      this.selectedParking.lots.forEach(e2 => {
        if(e2.lotNumber == id){
          e2.isAvailable = false
        }
      });  
    });

    new_toHandi.forEach(e1 => {
      const id = e1.lotNumber
      this.selectedParking.lots.forEach(e2 => {
        if(e2.lotNumber == id){
          e2.isHandicapped = false
        }
      });  
    });
    
    if(this.selectedParking.lots.length > new_capacity){
      this.selectedParking.lots = this.selectedParking.lots.splice(0, new_capacity)
    }
    else if(this.selectedParking.lots.length < new_capacity){
      for(let i=this.selectedParking.lots.length; i<new_capacity;i++){
        this.selectedParking.lots.push(
          {
            bookedBy: "",
            dateReserved: "",
            duration: "",
            isAvailable: false,
            isHandicapped: false,
            lotNumber: i+1,
            timeReserved: ""
          }
        )
      }
    }
    console.log(this.selectedParking)
    this.enfServ.updateParking(this.selectedKey, this.selectedParking)
    return
  }  
}

 


