import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EnforcerService {
  
  parkingPath ="/parkings"
  parkingRef: AngularFireList<any> = null;
  parkings = []
  constructor(
    private database: AngularFireDatabase
  ) { 
    this.parkingRef = database.list(this.parkingPath);
    this.getAllParkings()
    
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
        this.parkings.push({key, payload});
      });
    });
  }

  updateParking(id, data) {
    this.parkingRef.update(id, data);
    this.getAllParkings();
  }
  
}
