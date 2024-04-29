import { Injectable } from '@angular/core';
import { Habit } from '@data/interfaces/habit.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '@shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  newHabit(habit: Habit) {
    let id = this.authService.getUserDataFromLocalStorage().id;
    return this.firestore.collection('users').doc(id).collection('habits').add(habit);
  }
}
