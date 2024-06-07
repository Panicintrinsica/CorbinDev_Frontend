import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButton,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(private authService: AuthService) {}

  login(){
    this.authService.login(this.username, this.password)
  }

  isValidTest(){

  }

}
