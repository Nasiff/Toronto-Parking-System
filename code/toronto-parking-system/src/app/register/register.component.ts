import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  patronRegForm: FormGroup;
  enforcerRegForm: FormGroup;
  registerUserType: String;

  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
    ) {
    // Default reg type is of a patron's
    this.registerUserType = 'Patron';

    this.patronRegForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      name: ["", Validators.required],
      surname: ["", Validators.required],
      username: ["", [Validators.required, Validators.minLength(6)]],
      phone: ["", [Validators.required, Validators.minLength(10)]],
      password: ["", [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ]],
      address: ["", Validators.required],
      city: ["", Validators.required],
      province: ["", [Validators.required, Validators.minLength(2)]],
      postalCode: ["", [Validators.required, Validators.minLength(6)]],
      vehicles: this.formBuilder.array([]),
      security1: ["", Validators.required],
      answer1: ["", Validators.required],
      security2: ["", Validators.required],
      answer2: ["", Validators.required],
    });

    this.enforcerRegForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      name: ["", Validators.required],
      surname: ["", Validators.required],
      username: ["", [Validators.required, Validators.minLength(6)]],
      phone: ["", [Validators.required, Validators.minLength(10)]],
      password: ["", [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ]],
      badge: ["", [Validators.required, Validators.min(10000000), Validators.max(99999999)]],
      security1: ["", Validators.required],
      answer1: ["", Validators.required],
      security2: ["", Validators.required],
      answer2: ["", Validators.required]
    });
  }

  ngOnInit() {
    // Add the first set of vehicle labels on startup
    this.addVehicleLabels();
  }

  get vehicleLabels() {
    return this.patronRegForm.get('vehicles') as FormArray
  }

  addVehicleLabels() {
    const labels = this.formBuilder.group({
      vehicleMake: ["", Validators.required],
      vehicleModel: ["", Validators.required],
      license: ["", [Validators.required, Validators.minLength(6)]]
    });

    this.vehicleLabels.push(labels);
  }

  /**
   * Quick access to the controls on the patron registration form
   */
  get prf() {
    return this.patronRegForm.controls;
  }

  /**
   * Quick access to the controls on the patron registration form
   */
  get erf() {
    return this.enforcerRegForm.controls;
  }

  deleteVehicleLables(i) {
    this.vehicleLabels.removeAt(i);
  }

  getValidity(i) {
    return this.vehicleLabels.controls[i];
  }

  switchToPatronForm() {
    this.registerUserType = 'Patron'
  }

  switchToEnforcerForm() {
    this.registerUserType = 'Enforcer'
  }

  // WIP
  onSubmit(formData) {
    switch(this.registerUserType) {
      case 'Patron': {
        try {
          this.loading = true;
          this.addAdditionalPatronFields(formData);
          this.userService.addPatron(formData);
          alert("You have registered successfully!");
          this.router.navigate(["/"]); // Navigate to login
        } catch (error) {
          alert("Patron: " + error);
          this.loading = false;
        }
        this.loading = false;

        break;
      }
      case 'Enforcer': {
        try {
          this.loading = true;
          this.addAdditionalEnforcerFields(formData);
          this.userService.addEnforcer(formData);
          alert("You have registered successfully!")
          this.router.navigate(["/"]) // Navigate to login
        } catch (error) {
          alert("Enforcer: " + error);
        }

        break;
      }
      default: {
      }
    }
  }

  private addAdditionalPatronFields(formData: any) {
    formData.userType = 'patron';
    formData.paymentType = "";
    formData.cc = "";
    formData.ccName = "";
    formData.ccExpiry = "";
    formData.ccCode = "";
    // Add any required fields to track patron status as they use the app
  }

  private addAdditionalEnforcerFields(formData: any) {
    formData.userType = 'enforcer';
    // Add any required fields to track enforcer status as they use the app
  }
}
