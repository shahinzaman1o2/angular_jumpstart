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
  templateUrl: './api-product-category.component.html',
  styleUrls: ['./api-product-category.component.css']
})
export class ApiProductCategoryComponent {
  title = 'fakestore-app';
  categories = ['electronics', 'jewelery', "men's clothing", "women's clothing"];
  products: Product[] = [];
  selectedCategory = '';

  constructor(private ApiProductCategoryService: ApiProductCategoryService) { }

  async onCategorySelected(category: string) {
    this.selectedCategory = category;
    this.products = await this.ApiProductCategoryService.getProductsByCategory(category);
  }
}
