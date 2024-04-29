import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsistencyGridComponent } from './consistency-grid.component';

describe('ConsistencyGridComponent', () => {
  let component: ConsistencyGridComponent;
  let fixture: ComponentFixture<ConsistencyGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsistencyGridComponent]
    });
    fixture = TestBed.createComponent(ConsistencyGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
