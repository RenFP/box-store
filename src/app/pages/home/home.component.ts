import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//Service
import { ProductService } from "../../services/product.service";
import { Product } from '../../interfaces/product';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}