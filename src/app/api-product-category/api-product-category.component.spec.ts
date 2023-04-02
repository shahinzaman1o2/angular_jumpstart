import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiProductCategoryComponent } from './api-product-category.component';

describe('ApiProductCategoryComponent', () => {
  let component: ApiProductCategoryComponent;
  let fixture: ComponentFixture<ApiProductCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiProductCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
