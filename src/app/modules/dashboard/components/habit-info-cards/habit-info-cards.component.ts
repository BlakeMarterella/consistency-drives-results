import { Component, Input } from '@angular/core';
import { Habit } from '@data/interfaces/habit.interface';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'dashboard-habit-info-cards',
  templateUrl: './habit-info-cards.component.html',
  styleUrls: ['./habit-info-cards.component.scss']
})
export class HabitInfoCardsComponent {
  @Input() habit: Habit;

  is_editing: boolean = false;
  old_habit_name: string = '';
  show_delete_confirmation: boolean = false;
  new_color;

  constructor(private databaseService: DatabaseService) {}

  start_editing(): void {
    this.is_editing = true;
    this.old_habit_name = this.habit.name;
    this.new_color = this.habit.color;
  }

  cancel_editing(): void {
    this.is_editing = false;
    this.habit.name = this.old_habit_name;
    this.new_color = this.habit.color;
  }

  delete_habit(): void {
    // delete habit
    this.databaseService.deleteHabit(this.habit.id).then(() => {
      this.show_delete_confirmation = false;
      window.location.reload();
    });
  }

  update_habit(): void {
    this.habit.color = this.new_color;
    this.databaseService.updateHabit(this.habit).then(() => {
      this.is_editing = false;
      window.location.reload();
    });
  }
}
