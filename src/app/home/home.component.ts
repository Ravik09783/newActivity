import { Component, OnInit, HostListener } from '@angular/core';
import {HomeService} from './home.service';
import {Constants} from '../shared/constants';
import { ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { ApiRequestService } from '../shared/services/api-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    isStickyTabs: boolean = false;
    @HostListener('window:scroll', ['$event']) onScrollEvent($event){
        this.isStickyTabs = window.pageYOffset >= 250;
    }
  constructor(private homeService: HomeService,private router:Router, private route: ActivatedRoute, private http: HttpClient, private apiRequestService: ApiRequestService) { }
  tabOptions = [];
  providerId: string = environment.providerId;
  accessToken: string = this.apiRequestService.accessToken;
  locationId: string;
  sessionDate: string;
  isProcessing = false;
  bookingTypeId: string = 'weekly';
  providerLocDetails: any = {};
  data: any;
  heartIcon  =  '../../../../assets/images/icons/heart.png';
  bookingTypes:[] = Constants.bookingType;

  paramValue: string;



  ngOnInit(): void {


    this.router.navigate([''], { queryParams: { providerId: this.providerId, providerToken:this.accessToken} });

    this.route.queryParams
      .subscribe(params => {
        if(params.providerId && params.locationId){
          this.providerId = params.providerId;
          this.locationId = params.locationId;
          this.loadData();
        }
      });

      // console.log("*********", this.providerId)
      // console.log("*************",this.apiRequestService.accessToken)

      // const headers = new HttpHeaders({ 'providerId': 'application/json' , 'accessToken': });
      // this.http.post('https://api.example.com/resource',  { headers }).subscribe(response => {
      // console.log(response);
      // });
      



  }
  
  changeBookingDate(sessionDate) {
      let d = new Date(sessionDate);
      this.sessionDate = [`${d.getFullYear()}`, `0${d.getMonth()}`.substr(-2), `0${d.getDate()}`.substr(-2)].join("-");
      this.loadData();
  }
  
  changeBookingType($event){
    this.bookingTypeId = $event.value;
    console.log(this.bookingTypeId, $event);
    this.loadData();
  }

  loadData(){
      this.isProcessing = true;
    this.homeService.loadDashboardData(this.providerId, this.locationId, this.bookingTypeId, this.sessionDate).subscribe(
      response =>{
          this.isProcessing = false;
           if(response && response.data){
              var res = response.data;
              if(res){
                if(res.location){
                  this.providerLocDetails = res.location;
                }
                if(res.sessions){
                  if(_.isEmpty(res.sessions)){
                    this.tabOptions = [];
                    this.data = {};
                  }
                  for(let key in res.sessions){
                      if(!this.tabOptions.includes(key)) {
                        this.tabOptions.push(key);
                      }
                    this.data = res.sessions;
                  }
                }
              }
              
           }
           console.log(this.tabOptions, "taboptions");
      },
      error =>{

      }
    )

  }

}
