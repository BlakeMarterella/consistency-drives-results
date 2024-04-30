import { Injectable } from '@angular/core';
import { Habit } from '@data/interfaces/habit.interface';
import { FB_ENTRY, FB_HABIT, FB_USER } from '@data/firebase.schema';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AuthService } from '@shared/services/auth.service';
import { map } from 'rxjs';
import { getFirebaseErrorMessage } from '@data/constants/firebase-auth-error-codes';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  userId: string;
  userRef: AngularFirestoreCollection<FB_USER>;
  habitRef: AngularFirestoreCollection<FB_HABIT>;
  entryRef: AngularFirestoreCollection<FB_ENTRY>;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {
    this.userId = this.authService.getUserDataFromLocalStorage().id;
    this.userRef = this.firestore.collection('users');
    this.habitRef = this.firestore
      .collection('users')
      .doc(this.userId)
      .collection('habits');
    this.entryRef = this.firestore
      .collection('users')
      .doc(this.userId)
      .collection('entries');
  }

  /**
   * Create a new habit document for the current
   * user in the Firestore database.
   *
   * Collection: users/<userId>/habits/
   *
   * @param FB_HABIT The habject document to put into firebase
   * @returns Promise<Habit>
   *    resolves: new habit object (with id field of new doc) if successful
   *    rejects: error message if unsuccessful
   *
   * Habit a new habit object thats useable for the frontend
   *  Adds the "id" field
   */
  newHabit(habit: FB_HABIT): Promise<Habit> {
    const newHabit: Habit = { ...habit, id: '' };

    return new Promise<Habit>((resolve, reject) => {
      this.habitRef
        .add(habit)
        .then((docRef) => {
          // docRef is the reference to the document that was just created
          newHabit.id = docRef.id;
          resolve(newHabit);
        })
        .catch((error) => {
          reject(getFirebaseErrorMessage(error.code));
        });
    });
  }

  /**
   * Get all of the habits for the current user
   *
   * @returns Habit[] Return a list of habits
   */
  getHabits() {
    return this.habitRef.get().pipe(
      map((cartItems) => {
        return cartItems.docs.map((doc) => {
          return { ...doc.data(), id: doc.id } as Habit;
        });
      })
    );
  }

  // getHabits_asMap(): Promise<{ [key: string]: Habit }> {
  //   this.getHabits().subscribe((habits) => {
  //     habits.forEach((habit) => {
  //       this.habits[habit.id] = habit;
  //     });
  //   });
  // }

  getHabit(habitId: string): Promise<Habit> {
    return new Promise<Habit>((resolve, reject) => {
      this.habitRef
        .doc(habitId)
        .get()
        .pipe(
          map((doc) => {
            return { ...doc.data(), id: doc.id } as Habit;
          })
        )
        .subscribe(
          (habit) => {
            resolve(habit);
          },
          (error) => {
            reject(getFirebaseErrorMessage(error.code));
          }
        );
    });
  }

  /**
   * Delete a habit for the current user
   *
   * @param habitId string The id of the habit to delete
   * @returns Promise<boolean> true if successful, false if not
   */
  deleteHabit(habitId: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.habitRef
        .doc(habitId)
        .delete()
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(getFirebaseErrorMessage(error.code));
        });
    });
  }

  /**
   * Update a habit for the current user
   * 
   * @param habit 
   * @returns true if successful, false if not
   */
  updateHabit(habit: Habit): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.habitRef
        .doc(habit.id)
        .update(habit)
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(getFirebaseErrorMessage(error.code));
        });
    });
  }

  /**
   *
   * Data Design:
   *   Collection: users/<userId>/entries/
   *
   * Procedure:
   *  1. Query Firebase for User's Entries between startDate and endDate
   *  2. Return the entries
   *
   * @param startDate
   * @param endDate
   * @returns
   */
  getEntries(startDate: Date, endDate: Date): Promise<FB_ENTRY[]> {
    // TODO fix the filtering

    return new Promise<FB_ENTRY[]>((resolve, reject) => {
      this.entryRef.ref
        // .where('date', '>=', startDate.toString())
        // .where('date', '<=', endDate.toString())
        .get()
        .then((querySnapshot) => {
          const entries: FB_ENTRY[] = [];
          querySnapshot.forEach((doc) => {
            entries.push(doc.data() as FB_ENTRY);
          });
          resolve(entries);
        })
        .catch((error) => {
          reject(getFirebaseErrorMessage(error.code));
        });
    });
  }

  /**
   *
   * @param entry
   * @returns
   */
  newEntry(entry: FB_ENTRY, date: string) {
    return this.entryRef.doc(date).set(entry);
  }
}
