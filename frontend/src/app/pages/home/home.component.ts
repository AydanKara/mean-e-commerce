import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeaturesComponent } from '../../shared/features/features.component';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule, FeaturesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
