import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountOrdersComponent } from "./account-orders/account-orders.component";

@Component({
  selector: 'app-profile',
  imports: [RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
