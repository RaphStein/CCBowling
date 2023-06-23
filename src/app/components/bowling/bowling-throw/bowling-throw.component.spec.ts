import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BowlingThrowComponent } from './bowling-throw.component';

describe('BowlingThrowComponent', () => {
  let component: BowlingThrowComponent;
  let fixture: ComponentFixture<BowlingThrowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BowlingThrowComponent]
    });
    fixture = TestBed.createComponent(BowlingThrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
