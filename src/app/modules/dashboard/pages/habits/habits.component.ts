import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Habit } from '@data/interfaces/habit.interface';

@Component({
  selector: 'database-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.scss']
})
export class HabitsComponent {
  
  allHabits: Habit[] = [];

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.databaseService.getHabits().subscribe((habits) => {
      this.allHabits = habits;
    });
  }

  
}
