import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {AuthService} from '../../security/auth.service';
import {LoginInfo} from '../../security/login-info';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  isLoginFailed = false;
  errorMessage = '';
  loginInfo: LoginInfo = new LoginInfo('', '');
  _authService: AuthService;

  constructor(private router: Router,
              private authService: AuthService) {
    this._authService = authService;
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
     this.authService.loginUser(this.loginInfo).subscribe(
      data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        let authorities = '';
        for (const authority of data.authorities) {
          authorities = authorities + authority.authority + ',';
        }
        authorities = authorities.slice(0, -1);
        localStorage.setItem('authorities', authorities);
        this.isLoginFailed = false;
      },
      error => {
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  logout(): void {
    this.authService.logoutUser();
    this.isLoginFailed = false;

  }
}
