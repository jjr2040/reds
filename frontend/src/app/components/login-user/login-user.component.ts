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
     this.userService.loguear({id: 0, username: this.username, password: this.password, is_staff: 'false'}).subscribe( loginUser => {
        console.log('loguear usuario');
        if (loginUser.username !==  '') {
          this.authService.currentUser = loginUser;
          this.router.navigate(['/resources/']);
        } else {
          this.username = '';
          this.password = '';
        }
        });
  }

}
