import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitInfoCardsComponent } from './habit-info-cards.component';

describe('HabitInfoCardsComponent', () => {
  let component: HabitInfoCardsComponent;
  let fixture: ComponentFixture<HabitInfoCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HabitInfoCardsComponent]
    });
    fixture = TestBed.createComponent(HabitInfoCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
