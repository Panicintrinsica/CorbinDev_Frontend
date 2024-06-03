import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {DataRowOutlet} from "@angular/cdk/table";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-admin-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    DataRowOutlet,
    RouterLink
  ],
  templateUrl: './admin-root.component.html',
  styleUrl: './admin-root.component.scss'
})
export class AdminRootComponent {

  AuthService = inject(AuthService);

  logout() {
    this.AuthService.clearToken()
  }
}
