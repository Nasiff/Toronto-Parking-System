import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router } from '@angular/router';
import { EnforcerRegistration } from '../register/EnforcerRegistration';
import { PatronRegistration } from '../register/PatronRegistration';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  patronPath = "/patrons"
  patronRef: AngularFireList<PatronRegistration> = null;
  patrons = [];

  enforcerPath = "/enforcers"
  enforcerRef: AngularFireList<EnforcerRegistration> = null;
  enforcers = [];

  private currentLoggedInUser = null; // The user that's currently logged in

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
        this.patrons.push(snapshot.payload.toJSON());
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
        this.enforcers.push(snapshot.payload.toJSON());
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

    this.patrons.forEach((elem: PatronRegistration) => {
      if (elem.username === username) {
        result = elem;
      }
    });

    if (result === null) {
      throw new Error("Patron with username: " + username + " doesn't exist")
    } else if (result.password !== password) {
      throw new Error("Username or password is incorrect")
    } else {
      this.currentLoggedInUser = result;

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

    this.enforcers.forEach((elem: EnforcerRegistration) => {
      if (elem.username === username) {
        result = elem;
      }
    });

    if (result === null) {
      throw new Error("Enforcer with username: " + username + " doesn't exist")
    } else if (result.password !== password) {
      throw new Error("Username or password is incorrect")
    } else {
      this.currentLoggedInUser = result;

      return result;
    }
  }

  /**
   * Get the details of the user that's currently logged in
   */
  getCurrentLoggedInUser() {
    return this.currentLoggedInUser;
  }

  /**
   * Logs out of the session and goes back to the login page
   */
  logout() {
    this.currentLoggedInUser = null;
    this.router.navigate(["/"]);
  }

  /**
   * Add a NEW patron to the database. Throws an error if patron email or
   * username already exists
   * 
   * @param formData 
   */
  addPatron(formData: PatronRegistration) {
    this.validateWithPatronDB(formData);

    this.patronRef.push(formData)
  }

  /**
   * Add a NEW enforcer to the database. Throws an error if enforcer email or
   * username already exists
   * 
   * @param formData 
   */
  addEnforcer(formData: EnforcerRegistration) {
    this.validateWithEnforcerDB(formData);

    this.enforcerRef.push(formData)
  }

  /**
   * Validate the incoming patron form data with the data that already exists
   * on the db. Checks if the email and/or usernames are already used.
   * 
   * @param formData 
   */
  private validateWithPatronDB(formData: PatronRegistration) {
    this.patrons.forEach((element: PatronRegistration) => {
      if (element.email == formData.email) {
        throw new Error("Email already exists")
      } else if (element.username == formData.username) {
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
  private validateWithEnforcerDB(formData: EnforcerRegistration) {
    this.enforcers.forEach((element: EnforcerRegistration) => {
      if (element.email == formData.email) {
        throw new Error("Email already exists")
      } else if (element.username == formData.username) {
        throw new Error("Username already exists")
      } else if (element.badge == formData.badge) {
        throw new Error("Badge already exists")
      }
    });
  }
}
