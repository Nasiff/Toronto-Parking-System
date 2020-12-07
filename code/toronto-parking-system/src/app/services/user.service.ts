import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router } from '@angular/router';
// import { EnforcerRegistration } from '../register/EnforcerRegistration';
// import { PatronRegistration } from '../register/PatronRegistration';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  patronPath = "/patrons"
  patronRef: AngularFireList<any> = null;
  patrons = [];

  enforcerPath = "/enforcers"
  enforcerRef: AngularFireList<any> = null;
  enforcers = [];

  constructor(
    private database: AngularFireDatabase,
    private router: Router
  ) {
    this.patronRef = database.list(this.patronPath);
    this.enforcerRef = database.list(this.enforcerPath);

    this.getAllPatrons();
    this.getAllEnforcers();
  }

  /**
   * Updates the patrons field with all the latest patrons in the database.
   */
  getAllPatrons() {
    this.patronRef.snapshotChanges().forEach(snapshot => {
      this.patrons = [];
      
      snapshot.forEach(snapshot => {
        const key = snapshot.key
        const payload = snapshot.payload.toJSON()
        this.patrons.push({key, payload});
      });
    });
  }

  /**
   * Updates the enforcers field with all the latest enforcers in the database.
   */
  getAllEnforcers() {
    this.enforcerRef.snapshotChanges().forEach(snapshot => {
      this.enforcers = [];
      
      snapshot.forEach(snapshot => {
        const key = snapshot.key
        const payload = snapshot.payload.toJSON()
        this.enforcers.push({key, payload});
      });
    });
  }

  /**
   * Login as an existing Patron using a username and a password
   * 
   * @param username 
   * @param password 
   */
  loginPatron(username: String, password: String) {
    let result = null

    this.patrons.forEach((elem) => {
      if (elem.payload.username === username) {
        result = elem;
      }
    });

    if (result === null) {
      throw new Error("Patron with username: " + username + " doesn't exist, Please register an account")
    } else if (result.payload.password !== password) {
      throw new Error("Username or password is incorrect")
    } else {
      localStorage.setItem("user", JSON.stringify(result)) // Set the user in the session

      return result
    }
  }

  /**
   * Login as an existing Enforcer using a username and a password
   * 
   * @param username 
   */
  loginEnforcer(username: String, password: String) {
    let result = null

    this.enforcers.forEach((elem) => {
      if (elem.payload.username === username) {
        result = elem;
      }
    });

    if (result === null) {
      throw new Error("Enforcer with username: " + username + " doesn't exist, Please register an account")
    } else if (result.payload.password !== password) {
      throw new Error("Username or password is incorrect")
    } else {
      localStorage.setItem("user", JSON.stringify(result)) // Set the user in the session

      return result;
    }
  }

  /**
   * Get the JSON representation of the user that's currently logged in
   */
  getCurrentLoggedInUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  /**
   * Logs out of the session and goes back to the login page
   */
  logout() {
    localStorage.removeItem("user"); // Clear the user from the session.
    this.router.navigate(["/"]);
  }

  /**
   * Add a NEW patron to the database. Throws an error if patron email or
   * username already exists
   * 
   * @param formData 
   */
  addPatron(formData) {
    this.validatePatronCreate(formData);

    this.patronRef.push(formData);
    this.getAllPatrons();
  }

  /**
   * Update the current logged in patron with new data
   * 
   * @param formData 
   */
  updatePatron(formData) {
    const id = this.getCurrentLoggedInUser().key;
    formData = JSON.parse(JSON.stringify(formData));
    this.patronRef.update(id, formData);
    this.getAllPatrons();
  }

  /**
   * Delete the details associated with the patron that's currently logged in.
   * 
   * @param formData 
   */
  deletePatron() {
    const id = this.getCurrentLoggedInUser().key
    this.database.list('/patrons/' + id).remove();
    this.getAllPatrons();
    this.logout();
  }

  /**
   * Add a NEW enforcer to the database. Throws an error if enforcer email or
   * username already exists
   * 
   * @param formData 
   */
  addEnforcer(formData) {
    this.validateWithEnforcerDB(formData);

    this.enforcerRef.push(formData)
  }

  /**
   * Update the current logged in enforcer with new data
   * 
   * @param formData 
   */
  updateEnforcer(formData) {
    const id = this.getCurrentLoggedInUser().key;
    formData = JSON.parse(JSON.stringify(formData));
    this.enforcerRef.update(id, formData);
    this.getAllEnforcers();
  }

  /**
   * Delete the account associated with the enforcer that's currently logged in.
   * 
   * @param formData 
   */
  deleteEnforcer() {
    const id = this.getCurrentLoggedInUser().key
    this.database.list('/enforcers/' + id).remove();
    this.getAllEnforcers();
    this.logout();
  }

  /**
   * Validate the incoming patron form data with the data that already exists
   * on the db. Checks if the email and/or usernames are already used.
   * 
   * @param formData 
   */
  private validatePatronCreate(formData) {
    this.patrons.forEach((element) => {
      if (element.payload.email == formData.email) {
        throw new Error("Email already exists")
      } else if (element.payload.username == formData.username) {
        throw new Error("Username already exists")
      }
    });
  }

  /**
   * Validate the incoming patron form data with the data that already exists
   * on the db. Checks if the email and/or usernames are already used.
   * 
   * @param formData 
   */
  private validateWithEnforcerDB(formData) {
    this.enforcers.forEach((element) => {
      if (element.payload.email == formData.email) {
        throw new Error("Email already exists")
      } else if (element.payload.username == formData.username) {
        throw new Error("Username already exists")
      } else if (element.payload.badge == formData.badge) {
        throw new Error("Badge already exists")
      }
    });
  }
}
