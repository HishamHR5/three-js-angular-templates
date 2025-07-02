import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitControlComponent } from './orbit-control.component';

describe('OrbitControlComponent', () => {
  let component: OrbitControlComponent;
  let fixture: ComponentFixture<OrbitControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrbitControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrbitControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
