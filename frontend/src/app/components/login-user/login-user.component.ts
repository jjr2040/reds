import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  username: string;
  password: string;
  user: User;
  constructor(private authService: AuthenticationService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
  }

  loguear() {
     this.user.password = this.password;
     this.username = this.username;
     this.userService.loguear(this.user).subscribe( response => {
        console.log('loguear usuario');
        if (response) {
          this.router.navigate(['/resources/']);
        }
        });
  }

}
