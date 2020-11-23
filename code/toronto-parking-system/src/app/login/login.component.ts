import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserType;
  patronLoginForm;
  enforcerLoginForm;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
    ) {
    // Default login type is of a patron's
    this.loginUserType = 'Patron';


    this.patronLoginForm = this.formBuilder.group({
      username: '',
      password: ''
    });

    this.enforcerLoginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit() {}

  switchToPatronForm() {
    this.loginUserType = 'Patron'
  }

  switchToEnforcerForm() {
    this.loginUserType = 'Enforcer'
  }

  // WIP
  onSubmit(formData) {
    switch(this.loginUserType) {
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