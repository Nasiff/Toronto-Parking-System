import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from ‘rxjs’;
//import { AngularFirestore } from '@angular/fire/firestore';
import { browser } from 'protractor';

interface parkinglot {
    address: String,
    distance: DoubleRange,
    isOpen: Boolean,
    lots: Array<lot>,
    parkingId: String,
    price: DoubleRange
}

interface lot {
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
  parkingRef: AngularFireList<parkinglot> = null;
  parkings = [];

  constructor(
    //private firestore: AngularFirestore,
    private database: AngularFireDatabase
  ) { 
    this.parkingRef = database.list(this.parkingPath);
   // console.log("Res1: \n")
    //console.log(this.firestore.collection(this.parkingPath).snapshotChanges());
    this.getAllParkings();
  }

  /**
   * Updates the patrons field with all the latest patrons in the database.
   */
  getAllParkings() {
    var res = new Map<String, any>();
    this.parkingRef.snapshotChanges().forEach(snapshot => {
      snapshot.forEach(snapshot => {
        const key = snapshot.key
        const payload = snapshot.payload.toJSON()
        
        res.set(key, payload);

      });
    });
    return res;
  }
  
}
