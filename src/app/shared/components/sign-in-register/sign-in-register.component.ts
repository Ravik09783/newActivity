// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-sign-in-register',
//   templateUrl: './sign-in-register.component.html',
//   styleUrls: ['./sign-in-register.component.css']
// })
// export class SignInRegisterComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }


import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef} from '@angular/material/dialog';
import { AuthService } from '../login-register/auth.service';
import {MatDialog} from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-sign-in-register',
  templateUrl: './sign-in-register.component.html',
  styleUrls: ['./sign-in-register.component.css']
})
export class SignInRegisterComponent implements OnInit {
    form: UntypedFormGroup;
    loginmessage:string;
    public loginInvalid: boolean;
    private formSubmitAttempt: boolean;
    private returnUrl: string;
    
    constructor(private fb: UntypedFormBuilder, private route: ActivatedRoute, private authService: AuthService, private dialogRef: MatDialogRef<any>, private dialog:MatDialog) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            username: ['', Validators.email],
            password: ['', Validators.required]
        });
    }
    
    async onSubmit() {

      console.log(this.form)
        this.loginInvalid = false;
        this.formSubmitAttempt = false;
        if (this.form.valid) {
            const username = this.form.get('username').value;
            const password = this.form.get('password').value;
            this.authService.login(username, password).subscribe(
            (response:any) =>{

                console.log("???????????", response)
                localStorage.setItem("accessToken",response.data.accessToken)
                if(response.statusCode == 200) {
                    this.authService.setUser(response.data);
                    this.dialogRef.close();
                }else {
                    this.loginInvalid = true;
                    this.loginmessage = response.message;
                }
            },
            err => {
                this.loginInvalid = true;
                this.loginmessage = err.error.message;
            });
        } else {
            this.formSubmitAttempt = true;
        }

        this.form.reset('')
    }

    register(){
        const dialogRef = this.dialog.open(RegisterComponent);

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
