import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../../services/api-request.service';
import { TooltipPosition } from '@angular/material/tooltip';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivityInfoComponent } from './activity-info/activity-info.component';
import { ActivityRegisterComponent } from './activity-register/activity-register.component';
import { DatePipe } from '@angular/common';
import { AuthService } from '../login-register/auth.service';
import { ActivityUsersBookedComponent } from './activity-users-booked/activity-users-booked.component';
import { Router, ActivatedRoute } from '@angular/router';
import { GiftCardsService } from '../../services/gift-cards.service';

@Component({
  selector: 'app-activity-home',
  templateUrl: './activity-home.component.html',
  styleUrls: ['./activity-home.component.css'],
  providers: [DatePipe],
})
export class ActivityHomeComponent implements OnInit {
  constructor(
    private apiRequestService: ApiRequestService,
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private giftCardsService:GiftCardsService
  ) {}

  activityDetials: any;
  filterActivityDetails:any;
  positionOptions = 'above';
  position = new UntypedFormControl(this.positionOptions[0]);
  accessToken:string;
  giftCardsData:any;
  semesterActivities:boolean;
  campActivities:boolean;
  allActivities:boolean;
  weekDaysData = [
    ['SU', 'Sunday'],
    ['M', 'Monday'],
    ['T', 'Tuesday'],
    ['W', 'Wednesday'],
    ['TH', 'Thursday'],
    ['F', 'Friday'],
    ['SA', 'Saturday'],
  ];

  ngOnInit(): void {
    this.semesterActivities = true;
    this.campActivities= true;
    this.allActivities= true;


    this.apiRequestService.getActivity('activitySessions').subscribe((res) => {
      this.activityDetials = res;
      this.filterActivityDetails = res;
      // this.dateChange();
      console.log('$$$$$$$$$$ ACTIVITY HOME', this.activityDetials);
    });

    // this.route.url.subscribe((url) => {
    //   // Check if the URL matches a specific pattern and open the corresponding dialog
    //   if (url[0].path === 'new-url') {
    //     this.openDialogBox();
    //   }
    // });

    this.accessToken = localStorage.getItem("accessToken")

    this.giftCardsData = this.giftCardsService.getGiftCards().subscribe((res)=>{
      this.giftCardsData = res;
      console.log("GGGGGGGGGG", this.giftCardsData)
    })




  }

  ActivityInfo(id: any) {
    this.apiRequestService.activityId = id;
    const dialogRef = this.dialog.open(ActivityInfoComponent);

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  // arrayName2 = [];

  openDialogBox() {
    const dialogRef = this.dialog.open(ActivityRegisterComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  bookNowActivity(id: string) {
    if (this.accessToken) {
      // this.router.navigate(['/new-url']);
      this.apiRequestService.activityId = id;
      console.log('Your user is logged in');

      const dialogRef = this.dialog.open(ActivityUsersBookedComponent);

      dialogRef.afterClosed().subscribe((result) => {
        // this.router.navigate(['../']);
      });
    } else {
      this.openDialogBox();
    }
  }


  filterActivities(data){
    console.log("Filter function is calling")
  }

  // allActivity(){
  //   this.semesterActivities = true;
  // }

  // semesterActivity(){
  //   this.campActivities = false;
  //   this.semesterActivities= true;
  // }

  // campActivity(){
  //   this.semesterActivities= false;
  //   this.campActivities= true;
  // }








}
