import { Injectable } from '@angular/core';
import { Habit } from '@data/interfaces/habit.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: AngularFirestore) { }

  newHabit(habit: Habit) {
    return this.firestore.collection('habits').add(habit);
  }
}
