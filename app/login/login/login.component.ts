import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BASE_URL } from '../../shared/constants';
import { LocalstorageService } from './../../shared/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  loginViewType!: string;
  signupFormGroup!: FormGroup;
  constructor(private http: HttpClient, private router: Router,
    private ls: LocalstorageService) {

  }

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
    this.signupFormGroup = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      tusername: new FormControl('', [Validators.required]),
      spassword: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required])
    })
    this.loginViewType = 'login';
  }
  get username(): any {
    return this.loginFormGroup.get('username');
  }
  get password(): any {
    return this.loginFormGroup.get('password');
  }
  get firstname(): any {
    return this.signupFormGroup.get('firstname');
  }
  get lastname(): any {
    return this.signupFormGroup.get('lastname');
  }
  get tusername(): any {
    return this.signupFormGroup.get('tusername');
  }
  get spassword(): any {
    return this.signupFormGroup.get('spassword');
  }
  get gender(): any {
    return this.signupFormGroup.get('gender');
  }
  get age(): any {
    return this.signupFormGroup.get('age');
  }
  signUp(signupFormGroupVals: any) {
    signupFormGroupVals.password = signupFormGroupVals.spassword;
    signupFormGroupVals.username = signupFormGroupVals.tusername;
    this.http.post(`${BASE_URL}/user/signup`, signupFormGroupVals).subscribe((res) => {
      console.log("Signup API>>>", res)
      // Trigger login
      const {username, password} = signupFormGroupVals;
      this.login({username, password});

    })
  }
  login(loginFormGroupVals: any) {
    this.http.post(`${BASE_URL}/user/login`, loginFormGroupVals).subscribe((res:any) => {
      console.log("Login API>>>", res)
      this.ls.saveItem('token', res.token);
      this.ls.saveItem('user', res.user);
      this.router.navigateByUrl('dashboard');
    })
    // TODO: Move below two lines to above API once API is integrated.
  }
}
