import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjePerpendicularComponent } from './eje-perpendicular.component';

describe('EjePerpendicularComponent', () => {
  let component: EjePerpendicularComponent;
  let fixture: ComponentFixture<EjePerpendicularComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EjePerpendicularComponent]
    });
    fixture = TestBed.createComponent(EjePerpendicularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
