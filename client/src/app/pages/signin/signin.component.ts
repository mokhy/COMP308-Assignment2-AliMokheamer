import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';

@Component({
  //here thats an extension i installed to detect spelling mistakes.. he did somehing to fix it bt anyone that not the isue
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user: User;

  constructor(
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = new User();
  }

  onSigninSubmit(): void {
    this.authService.authenticateUser(this.user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 4000});
        this.router.navigate(['/']);
       } else {
         this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeOut: 5000});
         this.router.navigate(['/signin']);
       }
    });
  }

}
