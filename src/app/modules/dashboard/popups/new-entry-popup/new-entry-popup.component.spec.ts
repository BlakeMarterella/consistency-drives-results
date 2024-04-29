import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEntryPopupComponent } from './new-entry-popup.component';

describe('NewEntryPopupComponent', () => {
  let component: NewEntryPopupComponent;
  let fixture: ComponentFixture<NewEntryPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewEntryPopupComponent]
    });
    fixture = TestBed.createComponent(NewEntryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
