import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsTsBuiltinFuncsComponent } from './js-ts-builtin-funcs.component';

describe('JsTsBuiltinFuncsComponent', () => {
  let component: JsTsBuiltinFuncsComponent;
  let fixture: ComponentFixture<JsTsBuiltinFuncsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JsTsBuiltinFuncsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(JsTsBuiltinFuncsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
