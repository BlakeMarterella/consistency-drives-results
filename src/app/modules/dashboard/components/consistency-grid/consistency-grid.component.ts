import { Component } from '@angular/core';

interface Habit {
  name: string;
  color: string;
}

@Component({
  selector: 'consistency-grid',
  templateUrl: './consistency-grid.component.html',
  styleUrls: ['./consistency-grid.component.scss']
})
export class ConsistencyGridComponent {
  public habits: {[key: string]: Habit | null} = {
    '2024-04-20': { name: 'Coding', color: 'bg-blue-500' },
    '2024-04-21': { name: 'Reading', color: 'bg-red-500' },
    '2024-04-22': { name: 'Exercise', color: 'bg-green-500' },
    '2024-04-23': null,  // An example of an empty day
    '2024-04-24': null,   // Another empty day
    '2024-04-25': null,   // Another empty day
    '2024-04-26': null,   // Another empty day
    '2024-04-27': null,   // Another empty day
    '2024-04-28': null,   // Another empty day
    '2024-04-29': null,   // Another empty day
    '2024-04-30': null,   // Another empty day
    '2024-05-01': null,   // Another empty day
    '2024-05-02': null,   // Another empty day
    '2024-05-03': null,   // Another empty day
    '2024-05-04': null,   // Another empty day
    '2024-05-05': null,   // Another empty day
    '2024-05-06': null,   // Another empty day
    '2024-05-07': null,   // Another empty day
    '2024-05-08': null,   // Another empty day
    '2024-05-09': null,   // Another empty day
    '2024-05-10': null,   // Another empty day
    '2024-05-11': null,   // Another empty day
  };

  public getDates(): string[] {
    return Object.keys(this.habits);
  }  

  constructor() { }
}
