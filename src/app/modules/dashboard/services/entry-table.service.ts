/**
 * Driver that is reponsible for creating the table of entries for the user
 * within a given date range.
 * 
 * The table is a 2D array of DateDetail objects.
 */
import { Injectable } from '@angular/core';
import { Habit } from '@data/interfaces/habit.interface';
import { DatabaseService } from './database.service';

/**
 * Each square in the table is a DateDetail object.
 */
export interface DateDetails {
  habits: Habit[] | null;
  isNewMonth: boolean;
  monthName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EntryTableService {

  // A map of all of the habits for the current user
  // TODO, this map can be expanded to include analytical data
  public habits: { [key: string]: Habit } = {};

  // All of the entries for table, the key is a date in the format YYYY-MM-DD
  public entryDates: { [key: string]: DateDetails } = {};

  constructor(private databaseService: DatabaseService) { 
    // Make a map of all of the habits
    // This reduces the amount of queries that we need to execute later
    this.databaseService.getHabits().subscribe((habits) => {
      habits.forEach((habit) => {
        this.habits[habit.id] = habit;
      });

      let startDate = this.getMonthFromToday(-2); // 2 months before today
      let endDate = this.getMonthFromToday(2); // 2 months after today
      
      this.initializeEntryDates(startDate, endDate);
      this.populateEntryDatesWithHabits(startDate, endDate);
      
      console.log(this.entryDates);
    });

  }

  /**
   * Get a date object that is a number of months from today.
   * 
   * @param monthsFromToday The number of months into the future of previous
   *  to the current date. A positive number will be number of months
   *  into the future and vice versa
   * @returns Date object that is the current date plus the number of months
   */
  private getMonthFromToday(monthsFromToday: number): Date {
    const date = new Date();
    date.setMonth(date.getMonth() + monthsFromToday);
    return date;
  }

  /**
   * Initialize the dates object with the last month, current month, and next month.
   * 
   * This is setting the stage before we populate the entryDates with information
   * on the user's habits. 
   * 
   * @param numMonthsPrev: The number of months before the current date to display
   * @param numMonthsAfter: The number of months after the current date to display
   */
  private initializeEntryDates(startDate: Date, endDate: Date): void {
    let lastMonth = startDate.getMonth();

    for (let dt = new Date(startDate); dt <= endDate; dt.setDate(dt.getDate() + 1)) {
      const currentMonth = dt.getMonth();
      const dateStr = dt.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      this.entryDates[dateStr] = {
        habits: null, // Initialize with null (empty) until we populate it
        isNewMonth: currentMonth !== lastMonth,
        monthName: currentMonth !== lastMonth ? dt.toLocaleString('default', { month: 'long' }) : undefined
      };
      lastMonth = currentMonth;
    }

  }
  
  /**
   * Populate the entryDates object with the habits for each date.
   * 
   * @param startDate The start date of the date range
   * @param endDate The end date of the date range
   */
  populateEntryDatesWithHabits(startDate: Date, endDate: Date): void {    
    // Get all of the entries within the date range
    this.databaseService.getEntries(startDate, endDate).then((entries) => {
      // Iterate through every entry
      entries.forEach((entry) => {
        // For each habit, populate the information 
        for (const habitId of entry.habitIds) {
          // If the date object does not have a habits array, create it
          if (!this.entryDates[entry.date.toString()].habits) {
            this.entryDates[entry.date.toString()].habits = [];
          }
          // Add the habit to the date object, referencing the habits map by the habitId
          let fullHabitDetail: Habit = this.habits[habitId];
          console.log(fullHabitDetail);
          this.entryDates[entry.date.toString()].habits.push(fullHabitDetail);
        }
      });
    });
  }
}
