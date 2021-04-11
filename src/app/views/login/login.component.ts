import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {AuthService} from '../../security/auth.service';
import {LoginInfo} from '../../security/login-info';
import {LoaderService} from '../../services/loader.service';

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
              private authService: AuthService,
              private loaderService: LoaderService) {
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
        this.loaderService.load();
        this.isLoginFailed = false;
        this.router.navigate(['/profile']);
      },
      error => {
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  // logout(): void {
  //   this.authService.logoutUser();
  //   this.isLoginFailed = false;
  //
  // }
}
