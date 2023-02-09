import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef} from '@angular/material/dialog';
import { AuthService } from '../login-register/auth.service';
import {MatDialog} from '@angular/material/dialog';
import { SignInRegisterComponent } from '../sign-in-register/sign-in-register.component';
import { ApiRequestService } from '../../services/api-request.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: UntypedFormGroup;
  loginmessage:string;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  
  constructor(private fb: UntypedFormBuilder, private route: ActivatedRoute, private authService: AuthService, private dialogRef: MatDialogRef<any> , private dialog:MatDialog, private apiRequestService:ApiRequestService) { }

  ngOnInit(): void {
      this.form = this.fb.group({
          email: ['', Validators.email],
          password: ['', Validators.required],
          name: ['', Validators.required],
          phone: ['', Validators.required],
          countrycode: [''],
      });
  }
  
  async onSubmit() {

    console.log("+++++++++++",this.form)

    
    const data ={
      email: this.form.value.email,
      password: this.form.value.password,
      name: this.form.value.name,
      countryCode: this.form.value.countrycode,
      phone: this.form.value.phone
      
    }

    this.apiRequestService.registerUser(data).subscribe((res=>console.log("@@@@@@@@@@@@@@#########", res)))

    // console.log("PPPPPPPPPPP",data)



      // this.loginInvalid = false;
      // this.formSubmitAttempt = false;
      // if (this.form.valid) {
      //     const username = this.form.get('username').value;
      //     const password = this.form.get('password').value;
      //     this.authService.login(username, password).subscribe(
      //     (response:any) =>{
      //         if(response.statusCode == 200) {
      //             this.authService.setUser(response.data);
      //             this.dialogRef.close();
      //         }else {
      //             this.loginInvalid = true;
      //             this.loginmessage = response.message;
      //         }
      //     },
      //     err => {
      //         this.loginInvalid = true;
      //         this.loginmessage = err.error.message;
      //     });
      // } else {
      //     this.formSubmitAttempt = true;
      // }
  }





  signIn(){
    const dialogRef = this.dialog.open(SignInRegisterComponent);

    // this.activityHomeComponent.closeDialog()

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  
  /**
   * login with social
   * 
   * @param string vendor i.e facebook or google
   */
  socialSignIn(vendor) {
      
  }

}