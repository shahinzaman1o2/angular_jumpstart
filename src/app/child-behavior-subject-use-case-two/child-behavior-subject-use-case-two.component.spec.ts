import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildBehaviorSubjectUseCaseTwoComponent } from './child-behavior-subject-use-case-two.component';

describe('ChildBehaviorSubjectUseCaseTwoComponent', () => {
  let component: ChildBehaviorSubjectUseCaseTwoComponent;
  let fixture: ComponentFixture<ChildBehaviorSubjectUseCaseTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChildBehaviorSubjectUseCaseTwoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChildBehaviorSubjectUseCaseTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product titles in the template', () => {
    const products = [
      { title: 'Product 1' },
      { title: 'Product 2' },
      { title: 'Product 3' }
    ];

    component.products = products;
    fixture.detectChanges();

    const productElements = fixture.nativeElement.querySelectorAll('li');
    expect(productElements.length).toBe(products.length);

    productElements.forEach((element: HTMLElement, index: number) => {
      expect(element.textContent).toContain(products[index].title);
    });
  });
});
