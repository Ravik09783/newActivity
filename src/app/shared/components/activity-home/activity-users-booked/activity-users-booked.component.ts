import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from 'src/app/shared/services/api-request.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-activity-users-booked',
  templateUrl: './activity-users-booked.component.html',
  styleUrls: ['./activity-users-booked.component.css']
})
export class ActivityUsersBookedComponent implements OnInit {

  constructor(
    private apiRequestService:ApiRequestService,
    private formBuilder: UntypedFormBuilder,
  ) { }

  activityInfo:any;
  allPaticipantsDetails:any;
  isParticipantsMissing:boolean ;
  addParticipants: UntypedFormGroup;

  ngOnInit(): void {
    this.apiRequestService.getActivityinfo("activitySessions",this.apiRequestService.activityId).subscribe(res=>{
      this.activityInfo= res.data
      // console.log("#############", this.activityInfo)

      // console.log(localStorage.getItem(!!"accessToken"))
    })

    this.apiRequestService.getParticipantsDatas().subscribe((res)=>{
      console.log("Participants Data++", res )
      this.allPaticipantsDetails = res.data;
      console.log("???????????", this.allPaticipantsDetails)
    })

    this.addParticipants = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      gender: [''],
      dob: [''],
      grade: ['']
    });

  }

  MissingParticipants(){
    console.log("Missing participants funciton called")
    this.isParticipantsMissing = !this.isParticipantsMissing;
    console.log(this.isParticipantsMissing)
      
  }

  onSubmit(){
    console.log("~~~~~~~~~~~~~~~~~~~~", this.addParticipants.value)
    var addP= []
    const data= {
      firstName:this.addParticipants.value.firstName,
      lastName:this.addParticipants.value.lastName,
      gender:this.addParticipants.value.gender,
      dob:this.addParticipants.value.dob,
      grade:this.addParticipants.value.grade
    }
 
    

    
    this.apiRequestService.addParticipants(data).subscribe((res)=>{
      console.log("??????????", res)
      this.ngOnInit()
    })


  }



}
