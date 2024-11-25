import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: 'app-admin-layout',
  imports: [RouterModule, CommonModule, FooterComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {

  constructor(private userService: UserService, private router: Router) {}
  
  onLogout(): void {
    this.userService.logout().subscribe(() => {
      // Clear auth state
      this.userService.setAuthState(null);
      this.router.navigate(['/home']);
    });
  }
}
