import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncidentService } from 'src/app/services/incident.service';

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentListComponent implements OnInit {
  incidents = []
  selectedIncident;
  isInaccessibleViolation;
  incidentForm: FormGroup;

  private incidentsCopy = []

  constructor(
    private formBuilder: FormBuilder,
    private incidentSvc: IncidentService
  ) {
    this.incidentsCopy = this.incidents;

    this.incidentForm = this.formBuilder.group({
      incidentId: ["", Validators.required],
      username: ["", Validators.required],
      lot: ["", Validators.required],
      spot: ["", Validators.required],
      location: ["", Validators.required],
      summary: ["", Validators.required],
      make: ["", Validators.required],
      model: ["", Validators.required],
      license: ["", Validators.required],
      date: ["", Validators.required],
      time: ["", Validators.required],
      color: ["", Validators.required],
    });

    this.incidentSvc.getAllIncidents();
    alert("Loading Incidents...")
    this.incidents = this.incidentSvc.incidents;
    this.incidentsCopy = this.incidents;
  }

  ngOnInit() {
    console.log(this.incidents);
  }

  sortByName() {
    this.incidents.sort((a, b) => {
      return this.compareStrings(a.payload.username, b.payload.username);
    });
  }

  sortByLocation() {
    this.incidents.sort((a, b) => {
      return this.compareStrings(a.payload.location, b.payload.location);
    });
  }

  searchById(id) {
    let results;
    if (id === "") {
      this.incidents = this.incidentsCopy
      return this.incidents;
    } else {
      results = this.incidents.filter(elem => {
        return elem.key.includes(id);
      });
    }

    this.incidents = results;
  }
  
  openIncidentDetails(incident) {
    this.selectedIncident = incident;
    this.setFormFields(this.selectedIncident);
  }

  goToIncidentListView() {
    this.selectedIncident = null;
  }

  onReview() {
    const response = prompt("Is the incident report legitimate?\n 'y' for Yes, 'n' for No, Type anything to cancel", "Cancel")

    if (response === 'y') {
      this.selectedIncident.payload.isValid = true;

      if(this.selectedIncident.payload.isRequestingRefund) {
        const refund = confirm("Do you want to issue a refund?");
        if (refund) {
          this.selectedIncident.payload.isRefunded = true;
        } else {
          this.selectedIncident.payload.isRefunded = false;
        }
        this.finalizeReview();
      } 
    } else if (response === 'n') {
      this.selectedIncident.payload.isValid = false;
      this.finalizeReview();
    }
  }

  private finalizeReview() {
    this.selectedIncident.payload.isResolved = true;
  
    try {
      this.incidentSvc.updateIncident(this.selectedIncident.key, this.selectedIncident.payload)
      alert("You have successfully reviewed the issue");
      this.selectedIncident = null;
    } catch (error) {
      alert("Enforcer Review: " + error)
    }
  }

  private compareStrings(a: String, b: String) {
    a = a.toLowerCase();
    b = b.toLowerCase();
  
    return (a < b) ? -1 : (a > b) ? 1 : 0;
  }

  private setFormFields(selectedIncident) {
    if(selectedIncident.payload.violationType.includes("Inaccessible")) {
      this.isInaccessibleViolation = true;
      this.incidentForm.get("make").clearValidators();
      this.incidentForm.get("model").clearValidators();
      this.incidentForm.get("license").clearValidators();
      this.incidentForm.get("color").clearValidators();
    } else {
      this.isInaccessibleViolation = null;
      this.incidentForm.get("make").setValue(selectedIncident.payload.violatorsVehicle)
      this.incidentForm.get("model").setValue(selectedIncident.payload.violatorsModel)
      this.incidentForm.get("license").setValue(selectedIncident.payload.violatorsLicense)
      this.incidentForm.get("color").setValue(selectedIncident.payload.violatorsColor)
    }
    this.incidentForm.get("incidentId").setValue(selectedIncident.key)
    this.incidentForm.get("username").setValue(selectedIncident.payload.username)
    this.incidentForm.get("lot").setValue(selectedIncident.payload.lotId)
    this.incidentForm.get("spot").setValue(selectedIncident.payload.spotId)
    this.incidentForm.get("location").setValue(selectedIncident.payload.location)
    this.incidentForm.get("summary").setValue(selectedIncident.payload.summary)
    this.incidentForm.get("date").setValue(selectedIncident.payload.date)
    this.incidentForm.get("time").setValue(selectedIncident.payload.time)
    this.incidentForm.get("incidentId").disable();
    this.incidentForm.get("username").disable();
    this.incidentForm.get("lot").disable();
    this.incidentForm.get("spot").disable();
    this.incidentForm.get("location").disable();
    this.incidentForm.get("summary").disable();
    this.incidentForm.get("date").disable();
    this.incidentForm.get("time").disable();
  }
}
