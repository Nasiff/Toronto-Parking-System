import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-enforcer-profile',
  templateUrl: './enforcer-profile.component.html',
  styleUrls: ['./enforcer-profile.component.css']
})
export class EnforcerProfileComponent implements OnInit {
  enforcerProfile: FormGroup;
  currentLoggedInUser;
  paymentOptions = ["Paypal", "Credit Card", "Debit Card"]

  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
    ) {
    this.enforcerProfile = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      name: ["", Validators.required],
      surname: ["", Validators.required],
      username: ["", [Validators.required, Validators.minLength(6)]],
      phone: ["", [Validators.required, Validators.minLength(10)]],
      password: ["", [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ]],
      badge: [""],
      security1: ["", Validators.required],
      answer1: ["", Validators.required],
      security2: ["", Validators.required],
      answer2: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.currentLoggedInUser = this.userService.getCurrentLoggedInUser();
    this.initForm();
  }

  /**
   * Quick access to the controls on the enforcer profile form
   */
  get erf() {
    return this.enforcerProfile.controls;
  }

  initForm() {
    this.enforcerProfile.get("email").setValue(this.currentLoggedInUser.payload.email);
    this.enforcerProfile.get("name").setValue(this.currentLoggedInUser.payload.name);
    this.enforcerProfile.get("surname").setValue(this.currentLoggedInUser.payload.surname);
    this.enforcerProfile.get("username").setValue(this.currentLoggedInUser.payload.username);
    this.enforcerProfile.get("username").disable();
    this.enforcerProfile.get("badge").setValue(this.currentLoggedInUser.payload.badge);
    this.enforcerProfile.get("badge").disable();
    this.enforcerProfile.get("phone").setValue(this.currentLoggedInUser.payload.phone);
    this.enforcerProfile.get("password").setValue(this.currentLoggedInUser.payload.password);
    this.enforcerProfile.get("security1").setValue(this.currentLoggedInUser.payload.security1);
    this.enforcerProfile.get("answer1").setValue(this.currentLoggedInUser.payload.answer1);
    this.enforcerProfile.get("security2").setValue(this.currentLoggedInUser.payload.security2);
    this.enforcerProfile.get("answer2").setValue(this.currentLoggedInUser.payload.answer2);
  }

  onSave(formData) {
    try {
      this.userService.updateEnforcer(formData);
      alert('Saved Changes. Changes will be reflected the next time you login');
    } 
     catch (error) {
       console.log(error);
    }
  }

  onDelete() {
    const shouldDelete = confirm('Are you sure you want to delete your account? It is irreversible')
    try {
      if (shouldDelete) {
        this.userService.deleteEnforcer();
        alert('Account successfully deleted');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
