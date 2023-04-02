import { Injectable } from '@angular/core';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiProductCategoryService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor() { }

  async getProductsByCategory(category: string): Promise<Product[]> {
    const response = await axios.get<Product[]>(`${this.apiUrl}/category/${category}`);
    return response.data;
  }
}
