import { Component } from '@angular/core';
import { Habit } from '@data/interfaces/habit.interface';
import { DatabaseService } from '../../services/database.service';
import { EntryTableService } from '../../services/entry-table.service';

interface DateDetails {
  habits: Habit[] | null;
  isNewMonth: boolean;
  monthName?: string;
}

@Component({
  selector: 'consistency-grid',
  templateUrl: './consistency-grid.component.html',
  styleUrls: ['./consistency-grid.component.scss']
})
export class ConsistencyGridComponent {
  
  // A map of the habit id to all of the habit details for a user
  public habits: { [key: string]: Habit } = {};
  // The information for each square on the grid
  public dates: { [key: string]: DateDetails } = {};
  
  constructor(private entryTableService: EntryTableService) {
    this.habits = this.entryTableService.habits;
    this.dates = this.entryTableService.entryDates;
  }

  public getDates(): string[] {
    return Object.keys(this.dates).sort(); // Ensure the dates are sorted
  }
}
