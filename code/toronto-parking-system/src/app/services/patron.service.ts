import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PatronService {
  parkingPath = "/parkings"
  parkingRef: AngularFireList<any> = null;
  parkings = [];

  constructor(private database: AngularFireDatabase) { 
    this.parkingRef = database.list(this.parkingPath);

    this.getAllParkings();
  }

  getAllParkings() {
    this.parkingRef.snapshotChanges().forEach(snapshot => {
      this.parkings = [];
      
      snapshot.forEach(snapshot => {
        const key = snapshot.key
        const payload = snapshot.payload.toJSON()
        this.parkings.push({key, payload});
      });
    });
  }

  updateParkingWithBooking(id, data) {
    this.parkingRef.update(id, data);
    this.getAllParkings();
  }
}
