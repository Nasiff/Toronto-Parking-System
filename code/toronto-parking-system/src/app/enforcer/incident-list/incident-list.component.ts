import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentListComponent implements OnInit {
  incidents = [
    {
      incidentId: 12345,
      type: "Parking Lot Violation",
      parkingId: 12345,
      violatorsVehicle: "Toyota",
      violatorsModel: "2021",
      violatorsLicense: "123ABC",
      violatorsColor: "Red",
      date: "",
      time: "",
      description: "Lol parking",
      username: "lololol",
      isRequestingRefund: true,
      isRefunded: false,
      isResolved: false,
      isValid: "",
      location: "Osgoode",
      lotId: "43"
    },
    {
      incidentId: 12346,
      type: "Parking Lot Violation",
      parkingId: 12345,
      violatorsVehicle: "Toyota",
      violatorsModel: "2002",
      violatorsLicense: "123ABC",
      violatorsColor: "Red",
      date: "",
      time: "",
      description: "Wrong spot parking",
      username: "aaaa",
      isRequestingRefund: true,
      isRefunded: false,
      isResolved: false,
      isValid: "",
      location: "YorkU",
      lotId: "87"
    },    
    {
      incidentId: 12347,
      type: "Parking Lot Violation",
      parkingId: 12345,
      violatorsVehicle: "Toyota",
      violatorsModel: "2010",
      violatorsLicense: "123ABC",
      violatorsColor: "Red",
      date: "",
      time: "",
      description: "Disastrous parking",
      username: "bbbb",
      isRequestingRefund: true,
      isRefunded: false,
      isResolved: false,
      isValid: "",
      location: "Lassonde",
      lotId: "14"
    }
  ]
  
  selectedIncident;
  incidentForm: FormGroup;

  private incidentsCopy = []

  constructor(private formBuilder: FormBuilder) {
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
  }

  ngOnInit() {
  }

  sortByName() {
    this.incidents.sort((a, b) => {
      return this.compareStrings(a.username, b.username);
    });
  }

  sortByLocation() {
    this.incidents.sort((a, b) => {
      return this.compareStrings(a.location, b.location);
    });
  }

  searchById(id) {
    let results;
    if (id === "") {
      this.incidents = this.incidentsCopy
      return this.incidents;
    } else {
      results = this.incidents.filter(elem => {
        return elem.incidentId + "" === id
      });
    }

    this.incidents = results;
  }
  
  openIncidentDetails(incident) {
    this.selectedIncident = incident;
    this.disableFormFields();
    this.setFormFields(this.selectedIncident);
  }

  goToIncidentListView() {
    this.selectedIncident = null;
  }

  onReview() {
    const response = prompt("Is the incident report legitimate?\n 'y' for Yes, 'n' for No, Type anything to cancel", "Cancel")

    if (response === 'y') {
      this.selectedIncident.isValid = true;

      if(this.selectedIncident.isRequestingRefund) {
        const refund = confirm("Do you want to issue a refund?");
        if (refund) {
          this.selectedIncident.isRefunded = true;
        } else {
          this.selectedIncident.isRefunded = false;
        }
        this.finalizeReview();
      } 
    } else if (response === 'n') {
      this.selectedIncident.isValid = false;
      this.finalizeReview();
    }
  }

  private finalizeReview() {
    this.selectedIncident.isResolved = true;
    this.incidents = this.incidents.filter(elem => {
      return elem.isResolved == false;
    });
    console.log(this.incidents);
    this.selectedIncident = null;
  }

  private compareStrings(a: String, b: String) {
    a = a.toLowerCase();
    b = b.toLowerCase();
  
    return (a < b) ? -1 : (a > b) ? 1 : 0;
  }

  private disableFormFields() {
    this.incidentForm.get("incidentId").disable();
    this.incidentForm.get("username").disable();
    this.incidentForm.get("lot").disable();
    this.incidentForm.get("spot").disable();
    this.incidentForm.get("location").disable();
    this.incidentForm.get("summary").disable();
    this.incidentForm.get("make").disable();
    this.incidentForm.get("model").disable();
    this.incidentForm.get("license").disable();
    this.incidentForm.get("date").disable();
    this.incidentForm.get("time").disable();
    this.incidentForm.get("color").disable();
  }

  private setFormFields(selectedIncident) {
    this.incidentForm.get("incidentId").setValue(selectedIncident.incidentId)
    this.incidentForm.get("username").setValue(selectedIncident.username)
    this.incidentForm.get("lot").setValue(selectedIncident.lotId)
    this.incidentForm.get("spot").setValue(selectedIncident.parkingId)
    this.incidentForm.get("location").setValue(selectedIncident.location)
    this.incidentForm.get("summary").setValue(selectedIncident.description)
    this.incidentForm.get("make").setValue(selectedIncident.violatorsVehicle)
    this.incidentForm.get("model").setValue(selectedIncident.violatorsModel)
    this.incidentForm.get("license").setValue(selectedIncident.violatorsLicense)
    this.incidentForm.get("date").setValue(selectedIncident.date)
    this.incidentForm.get("time").setValue(selectedIncident.time)
    this.incidentForm.get("color").setValue(selectedIncident.violatorsColor)
  }
}
