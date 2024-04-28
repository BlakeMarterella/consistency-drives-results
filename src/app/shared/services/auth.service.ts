import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  firebaseErrors,
  getFirebaseErrorMessage,
} from '@data/constants/firebase-auth-error-codes';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { User } from '@data/interfaces/user.interface';
import { UserLocalStore } from '@data/interfaces/user-local-store.interface';
import { Observable } from 'rxjs';

const logPrefix = '[AuthService]';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuthErrorCodes = firebaseErrors;

  /**
   * AuthService constructor.
   * @param afAuth a Firebase Authentication object via AngularFireAuth.
   * @param router the app's Angular router.
   */
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) {}

  /**
   * Returns true if the user is logged in and their email is verified.
   *
   * @returns True if the user is logged in and their email is verified.
   */
  get isLoggedIn(): boolean {
    let _logPrefix = `${logPrefix}[isLoggedIn]`;
    const user = JSON.parse(localStorage.getItem('user')!);
    console.log(`${_logPrefix} User is logged in:`, user);
    return user !== null;
  }

  /**
   * Calls afAuth's signInWithEmailAndPassword method to sign in the user and
   * takes action accordingly.
   * @param email The email to use to attempt to sign in.
   * @param password The password to use to attempt to sign in.
   * @return null if the user has logged in successfully, otherwise
   *  a helpful error message will be displayed to the user
   */
  SignIn(email: string, password: string): Promise<string> {
    let _logPrefix = `${logPrefix}[SignIn]`;

    return new Promise((resolve, reject) => {
      this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          // If the result is valid then add the user to local storage
          if (result) {
            console.log(`${_logPrefix} Sign in successfuly`);
            this.getUserDataFromFirestore(result.user).then((customer) => {
              let userLocalStore: UserLocalStore = {
                id: customer.id,
                firstName: customer.firstName,
                email: customer.email,
              };

              console.log(`${_logPrefix} Saving details in local storage`);
              localStorage.setItem('user', JSON.stringify(userLocalStore));
              JSON.parse(localStorage.getItem('user')!);
              resolve(null);
            });
          } else {
            reject('Unable to sign in. Please try again later.');
          }
        })
        .catch((error) => {
          console.log(`${_logPrefix} Error signing in:`, error);
          reject(getFirebaseErrorMessage(error.code));
        });
    });
  }

  /**
   * Sends a verification email to the currently logged in user.
   * @param actionCodeSettings Object containing additional settings for the
   *  afAuth's sendEmailVerification method.
   */
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        // this.router.navigate(["verify-email-address"]);
      });
  }

  /**
   * Sends an email to the provided email address with instructions to
   * reset their account password.
   * @param passwordResetEmail The email to send the reset password email to.
   */
  forgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  /**
   *
   * @param newUser A User object containing the user's data.
   * @param email The User's email address.
   * @param password The User's password.
   * @returns Null if no error, or a string containing the error message.
   */
  signUp(newUser: User, email: string, password: string): Promise<String> {
    return new Promise((resolve, reject) => {
      this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          newUser.id = result.user.uid;
          newUser.emailVerified = result.user.emailVerified;
          newUser.dateCreated = result.user.metadata.creationTime;

          // Create new object in database
          this.firestore
            .collection('users')
            .doc(result.user.uid)
            .set(newUser, { merge: true });

          // Send verification email
          this.SendVerificationMail();

          let userLocalStore: UserLocalStore = {
            id: newUser.id,
            firstName: newUser.firstName,
            email: newUser.email,
          };

          localStorage.setItem('user', JSON.stringify(userLocalStore));
          JSON.parse(localStorage.getItem('user')!);

          resolve(null);
        })
        .catch((error) => {
          reject(getFirebaseErrorMessage(error.code));
        });
    });
  }

  getUserDataFromLocalStorage(): UserLocalStore {
    return JSON.parse(localStorage.getItem('user')!);
  }

  /**
   * Concatenate data stored in the firestore database
   *
   * This includes the user's street address
   */
  getFullUserData(): Promise<User> {
    return new Promise((resolve, reject) => {
      // Check that the user is logged in
      this.afAuth.authState.subscribe((fbUser: firebase.User) => {
        if (fbUser) {
          resolve(this.getUserDataFromFirestore(fbUser));
        } else {
          reject(null);
        }
      });
    });
  }

  /**
   *  Get the user's data from the firestore database
   *  the user data is located in the customers collection
   *
   * @param uid The user's uid
   */
  getUserDataFromFirestore(user: firebase.User): Promise<User> {
    let _logPrefix = `${logPrefix}[getUserDataFromFirestore]`;
    console.log(
      `${_logPrefix} Getting data from firestore for user:`,
      user.uid
    );
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('users')
        .doc(user.uid)
        .get()
        .subscribe((data) => {
          if (data) {
            let tempUser: User = {
              id: user.uid,
              email: data.data()!['email'],
              phone: data.data()!['phone'],
              firstName: data.data()!['firstName'],
              lastName: data.data()!['lastName'],
              emailVerified: user.emailVerified,
              dateCreated: user.metadata.creationTime,
            };

            resolve(tempUser);
          } else {
            reject(null);
          }
        });
    });
  }


  /**
   * Setting up user data when sign in with username/password, 
   * sign up with username/password and sign in with social auth 
   * provider in Firestore database using AngularFirestore + AngularFirestoreDocument service
   * 
   * @param uid 
   * @param user 
   */
  updateUserData(uid: string, user: User) {
    // Create new object in database
    this.firestore.collection('users').doc(uid).update(user);

    // this.router.navigate(["/account"]);
  }

  /**
   * Signs out the logged in user, clears the local storage of any user data,
   * then navigates the user back to the Login page.
   */
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['/', 'auth', 'sign-in']));
    });
  }
}
