import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleUpdateFormComponent } from './sale-update-form.component';

describe('SaleUpdateFormComponent', () => {
  let component: SaleUpdateFormComponent;
  let fixture: ComponentFixture<SaleUpdateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleUpdateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
