import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { CommonConstant } from '../CommonConstant/CommonConstant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: '';
  constructor(public router: Router, private loginService: LoginService) {}

  formData = {
    username: '',
    password: ''
  };

  ngOnInit() {}
  onSubmit(form: NgForm) {
    this.loginService.getLogin(form.value).subscribe(data => {
      const userDetailsJSON = data.json();
      if (userDetailsJSON.status === 200) {
        console.log(userDetailsJSON.message);
        localStorage.setItem('token', userDetailsJSON.accessToken);
        localStorage.setItem('firstname', userDetailsJSON.firstname);
        localStorage.setItem('lastName', userDetailsJSON.lastname);
        // console.log("==================", userDetailsJSON.lastname);
        localStorage.setItem('username', userDetailsJSON.username);
        if (
          userDetailsJSON.typeOfUser != null ||
          userDetailsJSON.typeOfUser !== '' ||
          userDetailsJSON.typeOfUser !== 'undefined'
        ) {
          if (userDetailsJSON.typeOfUser === CommonConstant.SUPER_ADMIN) {
            this.router.navigate(['/super-admin-dashboard/advt-details-list']);
          } else if (userDetailsJSON.typeOfUser === CommonConstant.ADMIN_USER) {
            this.router.navigate(['/admin-dashboard']);
          } else if (userDetailsJSON.typeOfUser === CommonConstant.NORMAL_USER) {
            this.router.navigate(['/dashboard']);
          }
          else if (userDetailsJSON.typeOfUser === CommonConstant.CLIENT_USER){
            this.router.navigate(["/client-dashboard"]);
          }
        }
      }
        else if (userDetailsJSON.status === 401) {
          if (
            userDetailsJSON.message != null ||
            userDetailsJSON.message !== '' ||
            userDetailsJSON.message !== 'undefined'
          ) {
            console.log(userDetailsJSON);
            // localStorage.setItem('errorMessage', userDetailsJSON.message);
            this.errorMessage = userDetailsJSON.message;
          }
      }
    });
  }
}
