import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BowlingScoreComponent } from './bowling-score.component';

describe('BowlingScoreComponent', () => {
  let component: BowlingScoreComponent;
  let fixture: ComponentFixture<BowlingScoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BowlingScoreComponent]
    });
    fixture = TestBed.createComponent(BowlingScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
