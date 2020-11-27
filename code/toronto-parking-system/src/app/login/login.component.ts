import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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
    private userService: UserService,
    private router: Router
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
        try {
          this.userService.loginPatron(formData.username, formData.password);
          this.router.navigateByUrl("/patron");
        } catch (error) {
          alert('Patron: ' + error)
        }

        break;
      }
      case 'Enforcer': {
        try {
          this.userService.loginEnforcer(formData.username, formData.password);
          this.router.navigateByUrl("/enforcer");
        } catch (error) {
          alert('Enforcer: ' + error)
        }
        break;
      }
      default: {
      }
    }
  }
}
