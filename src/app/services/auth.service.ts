import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { User } from './user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
// import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { NotificationService } from '../common/notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router, private notificationService: NotificationService) {
    this.user$ = this.angularFireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.angularFirestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.angularFireAuth.auth.signInWithPopup(provider);
    this.authorization(credential.user);
    this.updateUserData(credential.user);
  }

  async googleSignOut() {
    await this.angularFireAuth.auth.signOut();
    return this.router.navigate(['login']);
  }

  updateUserData({ uid, email, displayName, photoURL }: User) {
    const userRef: AngularFirestoreDocument<User> = this.angularFirestore.doc(`users/${uid}`);
    const data = {
      uid,
      email,
      displayName,
      photoURL
    };

    return userRef.set(data, { merge: true });
  }

  authorization({ email }: User) {
    this.angularFirestore.collection('registered', ref => ref.where('email', '==', email)).valueChanges()
      .subscribe(v => {
        if (v.length) {
          this.router.navigate(['/'])
        } else {
          this.googleSignOut();
          this.notificationService.showWarningMessage('You are not authorized to access here.')
          this.router.navigate(['login']);
        }
      });
  }
}
