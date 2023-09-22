import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfaComponent } from './pfa.component';

describe('PfaComponent', () => {
  let component: PfaComponent;
  let fixture: ComponentFixture<PfaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PfaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
