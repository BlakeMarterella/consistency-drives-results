import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHabitPopupComponent } from './new-habit-popup.component';

describe('NewHabitPopupComponent', () => {
  let component: NewHabitPopupComponent;
  let fixture: ComponentFixture<NewHabitPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewHabitPopupComponent]
    });
    fixture = TestBed.createComponent(NewHabitPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
