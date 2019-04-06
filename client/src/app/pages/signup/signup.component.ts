import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User;

  constructor(
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = new User();
  }

  onSignUpSubmit(): void {
    this.authService.signUpUser(this.user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Registration Successful, now you can signin', {cssClass: 'alert-success', timeOut: 5000});
        this.router.navigate(['/signin']);
       } else {
         this.flashMessage.show('Unable to create this account', {cssClass: 'alert-danger', timeOut: 5000});
         this.router.navigate(['/signup']);
       }
    });
  }

}
