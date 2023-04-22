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
    // <> Generic type parameter to specify the type of the Promise. We also use it with Observable, BehaviorSubject & etc to specify their types.
    const response = await axios.get<Product[]>(`${this.apiUrl}/category/${category}`);
    return response.data;
  }
  // Promise Represents the completion of an asynchronous operation
  // We can treat Promise as a `pending state` - when we get the response from the async api call, the `pending state` will 
  // resolve (means the Promise will resolve) and it'll notify the component to work with the data got from the response 
  // of the async api call - while the component is busy with the things which are not related to the response data of the async api call.

}

// Placeholder (Placeholder syntax):
//----------------------------------
// {{}} --> used in Template (to dynamically replace variable values or expressions in the output)
// `${}` --> used in TypeScript (to dynamically replace variable values or expressions in the output)
