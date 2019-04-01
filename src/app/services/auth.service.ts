import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { User } from './user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
// import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router) {
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
    this.updateUserData(credential.user);
  }

  async googleSignOut() {
    await this.angularFireAuth.auth.signOut();
    return this.router.navigate(['login']);
  }

  updateUserData({ email }: User) {
    this.angularFirestore.collection('registered', ref => ref.where('email', '==', email)).valueChanges()
      .subscribe(v => v.length ? this.router.navigate(['/']) : this.router.navigate(['login']));
  }
}
