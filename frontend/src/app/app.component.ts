import { Component, OnInit } from '@angular/core';

import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  isLoading: boolean = true;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    
  }
}
