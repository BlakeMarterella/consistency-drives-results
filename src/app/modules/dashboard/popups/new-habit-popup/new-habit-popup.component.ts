import { Component } from '@angular/core';
import { ModalService } from '@shared/services/modal.service';
import { DatabaseService } from '../../services/database.service';
import { FB_HABIT } from '@data/firebase.schema';


@Component({
  selector: 'dashboard-new-habit-popup',
  templateUrl: './new-habit-popup.component.html',
  styleUrls: ['./new-habit-popup.component.scss']
})
export class NewHabitPopupComponent {
    newHabitName = '';
    color;

    constructor(protected modalService: ModalService, private databaseService: DatabaseService) {}

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
}
