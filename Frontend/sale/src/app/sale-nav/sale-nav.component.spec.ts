import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleNavComponent } from './sale-nav.component';

describe('SaleNavComponent', () => {
  let component: SaleNavComponent;
  let fixture: ComponentFixture<SaleNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
