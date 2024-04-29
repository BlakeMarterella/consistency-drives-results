import { Component, OnInit } from '@angular/core';
import { ModalService } from '@shared/services/modal.service';
import { DatabaseService } from '../../services/database.service';
import { FB_HABIT } from '@data/firebase.schema';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // New Habit Form
  newHabitName = '';
  color;
  
  // New Entry Form
  newEntry_allHabits;
  newEntry_date = new Date();
  newEntry_selectedHabit = '';

  constructor(protected modalService: ModalService, private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.databaseService.getHabits().subscribe((habits) => {
      this.newEntry_allHabits = habits;
    });
  }

  /**
   * Submit the new habit form
   */
  submitNewHabit() {
    console.log(this.color);
    // TODO better input validation
    if (this.color !== undefined && this.newHabitName !== '') {
      let newHabit: FB_HABIT = {
        name: this.newHabitName,
        color: this.color
      }
      
      // Add the habit to the firebase
      this.databaseService.newHabit(newHabit).then((habit) => {
        console.log('New Habit:', habit);
      }).catch((error) => {
          console.error('Error creating new habit:', error);
      });
    }
  }

  selected(){
    console.log(this.newEntry_selectedHabit)
  }
}
