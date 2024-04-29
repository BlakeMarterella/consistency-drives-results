import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '@shared/services/modal.service';
import { DatabaseService } from '../../services/database.service';
import { Habit } from '@data/interfaces/habit.interface';
import { FB_ENTRY } from '@data/firebase.schema';

@Component({
  selector: 'dashboard-new-entry-popup',
  templateUrl: './new-entry-popup.component.html',
  styleUrls: ['./new-entry-popup.component.scss']
})
export class NewEntryPopupComponent implements OnInit {
    @Input() modalId: string;

    allHabits: Habit[];
    newEntry_date = new Date();
    newEntry_selectedHabit: Habit;

    constructor(protected modalService: ModalService, private databaseService: DatabaseService) {}

    ngOnInit(): void {
      this.databaseService.getHabits().subscribe((habits) => {
        this.allHabits = habits;
      });
    }

    selected() {
      console.log(this.newEntry_selectedHabit)
    }

    submitNewEntry() {
      let myNewEntry: FB_ENTRY = {
        habitIds: [this.newEntry_selectedHabit.id],
        date: this.newEntry_date,
        notes: ''
      };

      this.databaseService.newEntry(myNewEntry, this.newEntry_date.toString());
    }
}
