import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuiltinPipesComponent } from './builtin-pipes.component';

describe('BuiltinPipesComponent', () => {
  let component: BuiltinPipesComponent;
  let fixture: ComponentFixture<BuiltinPipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuiltinPipesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuiltinPipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
