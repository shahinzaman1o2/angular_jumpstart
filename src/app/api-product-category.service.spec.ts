import { TestBed } from '@angular/core/testing';

import { ApiProductCategoryService } from './api-product-category.service';

describe('ApiProductCategoryService', () => {
  let service: ApiProductCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiProductCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
