import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
roleUser: UserModel;
  registerUserData = {
    name: "",
    contact: "",
    email: "",
    password: ""
  };
  // email: String;
  // password: String;


  constructor(private authService: AuthService, private router: Router) {


   }


  ngOnInit(): void {
  }



  registerUser(){

    this.authService.registerUser(this.registerUserData).subscribe(
      res => {
        console.log(res);

        localStorage.setItem('token', res.token);

        this.router.navigate(['/login'])
    },
      err => console.log(err)
    )

  }

}
