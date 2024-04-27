import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent {

  signupForm!: FormGroup; //object for sign up form
  hidePassword=true; //variable for hide password

  constructor( private fb: FormBuilder,
    private snackBar: MatSnackBar,  //will show messages to the user
    private authService: AuthService,
    private router: Router){
      
    }

    ngOnInit(): void {  //controls for the sign up form
      this.signupForm=this.fb.group({   //fb-form builder
       name: [null, [Validators.required]],
       email: [null, [Validators.required, Validators.email]],
       password: [null, [Validators.required]],
       confirmpassword: [null, [Validators.required]],
      })
    }

    togglePasswordVisiblity(){
      this.hidePassword=!this.hidePassword;

    }

    onsubmit(): void {
      const password=this.signupForm.get('password')?.value;
      const confirmpassword=this.signupForm.get('confirmpassword')?.value;

      if(password !== confirmpassword){
        this.snackBar.open('Passwords do not match.', 'close', {duration:5000, panelClass: 'error-snackbar'});
        return;
 
      }

      this.authService.register(this.signupForm.value).subscribe(
        (response) =>{
          this.snackBar.open('Sign up successful!','Close', {duration: 5000});
          this.router.navigateByUrl("/login");

        },

        (error)=>{
          this.snackBar.open('Sign up failed. Please try again.', 'Close', {duration: 5000, panelClass: 'error-snackbar'});
        }
      )
}
}



    


    

  

 


