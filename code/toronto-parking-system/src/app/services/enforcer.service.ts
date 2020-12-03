import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
//import { Observable } from 'rxjs';
//import { AngularFirestore } from '@angular/fire/firestore';

interface ParkingLot {
    address: String,
    distance: DoubleRange,
    isOpen: Boolean,
    lots: Array<Lot>,
    parkingId: String,
    price: DoubleRange
}

interface Lot {
    bookedBy: String,
    dateReserved: String,
    duration: String,
    isAvailable: Boolean,
    isHandicapped: Boolean,
    lotNumber: Number,
    timeReserved: String

}

@Injectable({
  providedIn: 'root'
})
export class EnforcerService {
  
  parkingPath ="parkings"
  parkingRef: AngularFireList<ParkingLot> = null;
  parkings = [];

  constructor(
    private database: AngularFireDatabase
  ) { 
    this.parkingRef = database.list(this.parkingPath);
    this.getAllParkings();
  }

  /**
   * Updates the patrons field with all the latest patrons in the database.
   */
  getAllParkings() {
    this.parkingRef.snapshotChanges().forEach(snapshot => {
      this.parkings = [];
      snapshot.forEach(snapshot => {
        const key = snapshot.key
        const payload = snapshot.payload.toJSON()
        //console.log(payload)
        this.parkings.push({key, payload});

      });
    });
  }
  
}
