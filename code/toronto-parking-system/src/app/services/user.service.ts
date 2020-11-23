import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) {
    
  }

  // WIP
  getAllUsers() {
    return this.firestore.collection("users").snapshotChanges();
  }

  // WIP
  getUsersById(id) {
    return this.firestore.collection("users").snapshotChanges();
  }

  // WIP
  addUser(data) {
    this.validate();
    
    return new Promise<any>((resolve, reject) =>{
      this.firestore
          .collection("users")
          .add(data)
          .then(res => {}, err => reject(err));
    });
  }

  // Need to validate the incoming user data and all the fields
  validate() {

  }
}
