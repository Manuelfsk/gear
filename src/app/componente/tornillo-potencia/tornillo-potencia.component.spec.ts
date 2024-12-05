import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TornilloPotenciaComponent } from './tornillo-potencia.component';

describe('TornilloPotenciaComponent', () => {
  let component: TornilloPotenciaComponent;
  let fixture: ComponentFixture<TornilloPotenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TornilloPotenciaComponent]
    });
    fixture = TestBed.createComponent(TornilloPotenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
