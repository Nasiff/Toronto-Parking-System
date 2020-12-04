import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  incidentPath = "/incidents"
  incidentRef: AngularFireList<any> = null;
  incidents = [];

  constructor(private database: AngularFireDatabase) { 
    this.incidentRef = database.list(this.incidentPath);

    this.getAllIncidents();
  }

  getAllIncidents() {
    this.incidentRef.snapshotChanges().forEach(snapshot => {
      this.incidents = [];
      
      snapshot.forEach(snapshot => {
        const key = snapshot.key
        const payload = snapshot.payload.toJSON()
        this.incidents.push({key, payload});
      });
    });
  }

  addIncident(formData) {
    this.incidentRef.push(formData);
    this.getAllIncidents();
  }

  updateIncident(id, data) {
    this.incidentRef.update(id, data);
    this.getAllIncidents();
  }
}
