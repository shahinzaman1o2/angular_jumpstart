import { Component } from '@angular/core';
import { ApiProductCategoryService } from '../api-product-category.service';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

@Component({
  selector: 'app-api-product-category',
  template: `
    <div>
      <h1 style="margin-bottom: 55px;">{{ title }}</h1>
      <div>
        <h2>Categories: (click on the list --> )</h2>
        <ul>
          <li *ngFor="let category of categories" (click)="onCategorySelected(category)">
            {{ category }}
          </li>
        </ul>
      </div>
      <div>
        <h2>Selected Category: {{ selectedCategory }}</h2>
        <h2>Products:</h2>
        <ul>
          <li *ngFor="let product of products">
            {{ product.title }}
          </li>
        </ul>
      </div>
    </div>
    <br><br>

    <a routerLink="/observable-use-cases" style="font-weight: bold; font-size: larger;">observable-use-cases</a>
  `,
  styleUrls: ['./api-product-category.component.css']
})
export class ApiProductCategoryComponent {
  title = 'Api Products Category using Promise (& axios)';
  categories = ['electronics', 'jewelery', "men's clothing", "women's clothing"];
  products: Product[] = [];
  selectedCategory = '';

  constructor(private ApiProductCategoryService: ApiProductCategoryService) { }

  async onCategorySelected(category: string) {
    this.selectedCategory = category;
    this.products = await this.ApiProductCategoryService.getProductsByCategory(category);
  }
}
