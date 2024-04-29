import { Component, OnInit } from '@angular/core';
import { ModalService } from '@shared/services/modal.service';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newHabitName = '';
  newEntryDate = '';
  color;

  constructor(protected modalService: ModalService, private databaseService: DatabaseService) {}

  ngOnInit(): void {
  }

  submitNewHabit() {
    console.log(this.color);
    if (this.color !== undefined && this.newHabitName !== '') {
      let newHabit = {
        name: this.newHabitName,
        color: this.color
      }
      this.databaseService.newHabit(newHabit)
    }
  }
}
