import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserType;
  patronRegForm;
  enforcerRegForm;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
    ) {
    // Default reg type is of a patron's
    this.registerUserType = 'Patron';

    this.patronRegForm = this.formBuilder.group({
      email: '',
      username: '',
      password: '',
      license: '',
      vehicleName: ''
    });

    this.enforcerRegForm = this.formBuilder.group({
      email: '',
      username: '',
      password: '',
      badge: ''
    });
  }

  ngOnInit() {}

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
        console.log(formData)
        break;
      }
      case 'Enforcer': {
        console.log(formData)
        break;
      }
      default: {
      }
    }
  }
}
