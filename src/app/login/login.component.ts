import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialUser, SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  reactiveForm:any= FormGroup;
  user:any= SocialUser;
  isSignedin: any;  
  
  constructor(private fb: FormBuilder, private socialAuthService: SocialAuthService,private router:Router) { }

  ngOnInit() {
    this.reactiveForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });    
    
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.isSignedin = (user != null);
    
    });
}
googleSignin(): void {
 let res:any= this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
 setTimeout(() => {
  if(this.isSignedin){
 
    this.router.navigateByUrl('dashboard');
  }
 }, 1000);
 
 
}

logout(): void {
  this.socialAuthService.signOut();
}
}
