import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-issue-ticket',
  templateUrl: './issue-ticket.component.html',
  styleUrls: ['./issue-ticket.component.css']
})
export class IssueTicketComponent implements OnInit {
  IssueTicket: FormGroup;
  ViolationOptions = ["Vechicle has no valid parking permit", 
                      "Parked in handicapped space", 
                      "Parked in reserved or assigned space",
                      "parking in two spaces",
                      "other"
                    ];
  currentLoggedInUser;
  showPrintForm;
  ticketInfo;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.IssueTicket = this.formBuilder.group({
      typeofVio: [""],
      PLocation: ["", [Validators.required]],
      PLotNumber: ["", Validators.required],
      PParkingSpotNumber: ["", Validators.required],
      VMake: ["", [Validators.required]],
      VModel: ["", [Validators.required]],
      VLPlate: ["", [Validators.required]],
      IDate: ["", Validators.required],
      ITime: ["", Validators.required],
      VColor: ["", [Validators.required]],
      reasoning: [""] ,
      TFine: ["",[Validators.required]]
    });
    this.showPrintForm = false;
   }
  
  ngOnInit() {
    this.currentLoggedInUser = this.userService.getCurrentLoggedInUser();
    this.initForm();
  }
  

  get iss() {
    return this.IssueTicket.controls;
  }


  onSubmit(formData) {
    this.ticketInfo = formData;
    console.log(this.ticketInfo);
    
    
    this.showPrintForm = true;
    
  }

  goBack(){
    this.showPrintForm = false;
  }

  initForm() {
    this.IssueTicket.get("typeofVio").setValue("");
    this.IssueTicket.get("PLocation").setValue("");
    this.IssueTicket.get("PLotNumber").setValue("");
    this.IssueTicket.get("PParkingSpotNumber").setValue("");
    this.IssueTicket.get("VMake").setValue("");
    this.IssueTicket.get("VModel").setValue("");
    this.IssueTicket.get("VLPlate").setValue("");
    this.IssueTicket.get("IDate").setValue("");
    this.IssueTicket.get("ITime").setValue("");
    this.IssueTicket.get("VColor").setValue("");
    this.IssueTicket.get("reasoning").setValue("");
    this.IssueTicket.get("TFine").setValue("");
    
  }

  changeViolation(e) {
    this.IssueTicket.get("typeofVio").setValue(e.target.value, {
      onlySelf: true
    });
  }

}
