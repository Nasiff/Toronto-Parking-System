import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IncidentService } from 'src/app/services/incident.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: "app-report-incident",
  templateUrl: "./report-incident.component.html",
  styleUrls: ["./report-incident.component.css"],
})
export class ReportIncidentComponent implements OnInit {
  parkingViolationTypes = [
    "Parking Law Violation",
    "Inaccessible Parking Spot",
  ];

  isViolatorForm: boolean;
  incidentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userSvc: UserService,
    private incidentSvc: IncidentService
  ) {
    this.incidentForm = this.formBuilder.group({
      violationType: ["", Validators.required],
      location: ["", Validators.required],
      lot: ["", Validators.required],
      spot: ["", Validators.required],
      summary: ["", Validators.required],
      make: ["", Validators.required],
      model: ["", Validators.required],
      license: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      date: ["", Validators.required],
      time: ["", Validators.required],
      color: ["", Validators.required],
      refund: ["", Validators.required],
    });
    
    this.isViolatorForm = true;
  }

  ngOnInit() {}

  get incf() {
    return this.incidentForm.controls;
  }

  changeViolationType(e) {
    this.incidentForm.get("violationType").setValue(e.target.value, {
      onlySelf: true,
    });

    if (((String) (e.target.value)).includes('Violation')) {
      this.isViolatorForm = true
      this.incidentForm.get("make").setValidators(Validators.required)
      this.incidentForm.get("model").setValidators(Validators.required)
      this.incidentForm.get("license").setValidators(Validators.required)
      this.incidentForm.get("color").setValidators(Validators.required)
    } else {
      this.isViolatorForm = false;
      this.incidentForm.get("make").clearValidators();
      this.incidentForm.get("make").reset();
      this.incidentForm.get("model").clearValidators();
      this.incidentForm.get("model").reset();
      this.incidentForm.get("license").clearValidators();
      this.incidentForm.get("license").reset();
      this.incidentForm.get("color").clearValidators();
      this.incidentForm.get("color").reset();
    }
  }

  onSubmit(formData) {
    try {
      const incidentRecord = this.prepareIncidentFields(formData);
      this.incidentSvc.addIncident(incidentRecord);
      alert("Your report was successfully sent!")
    } catch (error) {
      alert("Patron Submit: " + error)
    }
  }

  clearForm() {
    this.incidentForm.reset();
  }

  prepareIncidentFields(formData) {
    const userName = this.userSvc.getCurrentLoggedInUser().payload.username;

    const fields = {
        violationType: formData.violationType,
        lotId: formData.lot,
        spotId: formData.spot,
        location: formData.location,
        violatorsVehicle: formData.make,
        violatorsModel: formData.model,
        violatorsLicense: formData.license,
        violatorsColor: formData.color,
        date: formData.date,
        time: formData.time,
        summary: formData.summary,
        username: userName,
        isRequestingRefund: formData.refund,
        isRefunded: false,
        isResolved: false,
        isValid: "",
    }
    
    return fields;
  }
}
