import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  reactiveForm:any= FormGroup;
  user:any= SocialUser;
  isSignedin: any;  
  
  constructor(private fb: FormBuilder, private socialAuthService: `SocialAuthService`,private router:Router) {  this.socialAuthService.authState.subscribe((user) => {
    this.user = user;
    this.isSignedin = (user != null);
   
  }); }

  ngOnInit() {
    this.reactiveForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });    
    
  
}
googleSignin(): void {
 let res:any= this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
 
 
 setTimeout(() => {
 
    this.router.navigateByUrl('dashboard');
  
 }, 800);
 
 
}

logout(): void {
  this.socialAuthService.signOut();
}
}
