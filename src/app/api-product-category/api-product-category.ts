import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiProductCategoryService, Product } from '../api-product-category-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-api-product-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-product-category.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./api-product-category.css']
})
export class ApiProductCategory {
  protected readonly title = 'Products Category by making Asynchronous API call';
  protected readonly categories = ['electronics', 'jewelery', "men's clothing", "women's clothing"];
  products$!: Observable<Product[]>;
  selectedCategory = '';

  constructor(private apiService: ApiProductCategoryService) { };

  onCategorySelected(category: string) {
    this.selectedCategory = category;
    this.products$ = this.apiService.getProductsByCategory(category);
  }
}
