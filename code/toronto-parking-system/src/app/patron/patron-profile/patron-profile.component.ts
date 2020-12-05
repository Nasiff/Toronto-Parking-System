import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-patron-profile',
  templateUrl: './patron-profile.component.html',
  styleUrls: ['./patron-profile.component.css']
})
export class PatronProfileComponent implements OnInit {
  patronProfile: FormGroup;
  currentLoggedInUser;
  paymentOptions = ["Paypal", "Credit Card", "Debit Card"]

  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
    ) {
    this.patronProfile = this.formBuilder.group({
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
      // vehicles: this.formBuilder.array([]),
      paymentType: [""],
      cc: [""],
      ccName: [""],
      ccExpiry: [""],
      ccCode: [""],
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
   * Quick access to the controls on the patron profile form
   */
  get prf() {
    return this.patronProfile.controls;
  }

  initForm() {
    this.patronProfile.get("email").setValue(this.currentLoggedInUser.payload.email);
    this.patronProfile.get("name").setValue(this.currentLoggedInUser.payload.name);
    this.patronProfile.get("surname").setValue(this.currentLoggedInUser.payload.surname);
    this.patronProfile.get("username").setValue(this.currentLoggedInUser.payload.username);
    this.patronProfile.get("username").disable();
    this.patronProfile.get("phone").setValue(this.currentLoggedInUser.payload.phone);
    this.patronProfile.get("password").setValue(this.currentLoggedInUser.payload.password);
    this.patronProfile.get("address").setValue(this.currentLoggedInUser.payload.address);
    this.patronProfile.get("city").setValue(this.currentLoggedInUser.payload.city);
    this.patronProfile.get("province").setValue(this.currentLoggedInUser.payload.province);
    this.patronProfile.get("postalCode").setValue(this.currentLoggedInUser.payload.postalCode);
    this.patronProfile.get("paymentType").setValue(this.currentLoggedInUser.payload.paymentType);
    this.patronProfile.get("cc").setValue(this.currentLoggedInUser.payload.cc);
    this.patronProfile.get("ccName").setValue(this.currentLoggedInUser.payload.ccName);
    this.patronProfile.get("ccExpiry").setValue(this.currentLoggedInUser.payload.ccExpiry);
    this.patronProfile.get("ccCode").setValue(this.currentLoggedInUser.payload.ccCode);
    this.patronProfile.get("security1").setValue(this.currentLoggedInUser.payload.security1);
    this.patronProfile.get("answer1").setValue(this.currentLoggedInUser.payload.answer1);
    this.patronProfile.get("security2").setValue(this.currentLoggedInUser.payload.security2);
    this.patronProfile.get("answer2").setValue(this.currentLoggedInUser.payload.answer2);
  }

  changePaymentType(e) {
    this.patronProfile.get("paymentType").setValue(e.target.value, {
      onlySelf: true
    });

    if (((String) (e.target.value)).includes('Paypal')) {
      this.patronProfile.get("cc").clearValidators();
      this.patronProfile.get("cc").disable()
      this.patronProfile.get("cc").reset();
      this.patronProfile.get("ccName").clearValidators();
      this.patronProfile.get("ccName").disable()
      this.patronProfile.get("ccName").reset();
      this.patronProfile.get("ccExpiry").clearValidators();
      this.patronProfile.get("ccExpiry").disable()
      this.patronProfile.get("ccExpiry").reset();
      this.patronProfile.get("ccCode").clearValidators();
      this.patronProfile.get("ccCode").disable()
      this.patronProfile.get("ccCode").reset();
    } else {
      this.patronProfile.get("cc").setValidators([Validators.required, Validators.min(100000000000), Validators.max(999999999999)]);
      this.patronProfile.get("cc").enable()
      this.patronProfile.get("ccName").setValidators(Validators.required);
      this.patronProfile.get("ccName").enable()
      this.patronProfile.get("ccExpiry").setValidators([Validators.required, Validators.maxLength(5), Validators.minLength(5)]);
      this.patronProfile.get("ccExpiry").enable()
      this.patronProfile.get("ccCode").setValidators([Validators.required, Validators.maxLength(3), Validators.minLength(3)]);
      this.patronProfile.get("ccCode").enable()
    }
  }

  onSave(formData) {
    try {
      this.userService.updatePatron(formData);
      alert('Saved Changes. Changes will be reflected the next time you login');
    } 
     catch (error) {
      alert("Patron Save: " + error)
    }
  }

  onDelete() {
    const shouldDelete = confirm('Are you sure you want to delete your account? It is irreversible')
    try {
      if (shouldDelete) {
        this.userService.deletePatron();
        alert('Account successfully deleted');
      }
    } catch (error) {
      alert("Patron Delete: " + error)
    }
  }
}
