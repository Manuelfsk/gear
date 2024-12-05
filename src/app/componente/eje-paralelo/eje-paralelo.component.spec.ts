import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjeParaleloComponent } from './eje-paralelo.component';

describe('EjeParaleloComponent', () => {
  let component: EjeParaleloComponent;
  let fixture: ComponentFixture<EjeParaleloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EjeParaleloComponent]
    });
    fixture = TestBed.createComponent(EjeParaleloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
