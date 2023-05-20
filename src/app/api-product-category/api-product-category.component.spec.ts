import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiProductCategoryComponent } from './api-product-category.component';
import { ApiProductCategoryService } from '../api-product-category.service';

describe('ApiProductCategoryComponent', () => {
  let component: ApiProductCategoryComponent;
  let fixture: ComponentFixture<ApiProductCategoryComponent>;
  let apiProductCategoryService: ApiProductCategoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiProductCategoryComponent],
      providers: [ApiProductCategoryService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ApiProductCategoryComponent);
    component = fixture.componentInstance;
    apiProductCategoryService = TestBed.inject(ApiProductCategoryService); // Use TestBed.inject() to retrieve the service instance
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedCategory when onCategorySelected is called', () => {
    const category = 'electronics';
    component.onCategorySelected(category);
    expect(component.selectedCategory).toBe(category);
  });

  it('should call getProductsByCategory when onCategorySelected is called', async () => {
    const category = 'electronics';
    const products = [
      { id: 1, title: 'Product 1', price: 10, description: 'Description 1', category: 'electronics', image: 'image1.jpg' },
      { id: 2, title: 'Product 2', price: 20, description: 'Description 2', category: 'electronics', image: 'image2.jpg' }
    ];

    spyOn(apiProductCategoryService, 'getProductsByCategory').and.returnValue(Promise.resolve(products));

    await component.onCategorySelected(category);

    expect(apiProductCategoryService.getProductsByCategory).toHaveBeenCalledWith(category);
    expect(component.products).toEqual(products);
  });
});
