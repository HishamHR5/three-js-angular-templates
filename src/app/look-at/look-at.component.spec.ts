import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookAtComponent } from './look-at.component';

describe('LookAtComponent', () => {
  let component: LookAtComponent;
  let fixture: ComponentFixture<LookAtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LookAtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LookAtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
