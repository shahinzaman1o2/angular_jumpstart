import { TestBed } from '@angular/core/testing';

import { ApiProductCategoryService } from './api-product-category.service';
import axios from 'axios';

describe('ApiProductCategoryService', () => {
  let service: ApiProductCategoryService;
  let axiosGetSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiProductCategoryService);
    axiosGetSpy = spyOn(axios, 'get');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call axios.get with the correct URL when getProductsByCategory is called', async () => {
    const category = 'electronics';
    const expectedResponse = [
      { id: 1, title: 'Product 1', price: 10, description: 'Description 1', category: 'electronics', image: 'image1.jpg' },
      { id: 2, title: 'Product 2', price: 20, description: 'Description 2', category: 'electronics', image: 'image2.jpg' }
    ];

    axiosGetSpy.and.returnValue(Promise.resolve({ data: expectedResponse }));

    const result = await service.getProductsByCategory(category);

    expect(axiosGetSpy).toHaveBeenCalledWith(`https://fakestoreapi.com/products/category/${category}`);
    expect(result).toEqual(expectedResponse);
  });
});
