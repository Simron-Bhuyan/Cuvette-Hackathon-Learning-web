import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserModel} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = "http://localhost:3000/users/register";
  private loginUrl = "http://localhost:3000/users/login";

  roleUser: UserModel;


  private token = localStorage.getItem('token');
  
  constructor( private http: HttpClient, private rotuer: Router) { 

    this.roleUser = this.getUser();
  }

  registerUser(user){

    return this.http.post<any>(this.registerUrl, user);
  }

  loginUser(user){

    this.roleUser = this.getUser();
    return this.http.post<any>(this.loginUrl, user);
  }

  logoutUser(){
    localStorage.removeItem('token')
    return this.rotuer.navigate(['/login'])
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getUser(): UserModel{
    let token = localStorage.getItem('token');
    if(token){
      return JSON.parse(atob(token.split('.')[1])) as UserModel;
      
    }
    return null;
  }

}
