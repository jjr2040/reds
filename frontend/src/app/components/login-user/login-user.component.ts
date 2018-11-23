import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  loginForm: FormGroup;
  submitted;

  constructor(private router: Router,
    private userService: UserService, private formBuilder: FormBuilder, private messageService: MessageService) {
      this.loginForm = this.formBuilder.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      });
  }

  ngOnInit() {
  }

  get f() {
    return this.loginForm.controls;
  }

  loguear() {
    this.submitted = true;

    if (this.loginForm.invalid) {
        return;
    }
    this.userService.loguear({id: 0, username: this.loginForm.value.username, password: this.loginForm.value.password, is_staff: 'false'})
    .subscribe( loginUser => {
      if (loginUser.username !==  '') {
        this.userService.currentUser = loginUser;
        localStorage.setItem('currentUser', JSON.stringify(loginUser));
        this.userService.isSignedIn.next(true);
        this.router.navigate(['/resources/']);
      } else {
        this.messageService.showError('Error', 'La contraseña o el usuario no coincide');
      }
    });
  }

}
