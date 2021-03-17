import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { from, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class FirebaseAuthService {
  constructor(private firebaseAuth: AngularFireAuth, private store$: Store) {}

  public signIn(email: string, password: string): Observable<User> {
    return from(
      this.firebaseAuth.signInWithEmailAndPassword(email, password)
    ).pipe(
      map((response) => {
        const { user } = response;
        return {
          uid: user?.uid == null ? '' : user.uid,
          email: user?.email == null ? '' : user.email,
        };
      })
    );
  }

  public signUp(email: string, password: string): Observable<User> {
    return from(
      this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    ).pipe(
      map((response) => {
        const { user } = response;
        return {
          uid: user?.uid == null ? '' : user.uid,
          email: user?.email == null ? '' : user.email,
        };
      })
    );
  }

  public logOut(): void {
    this.firebaseAuth.signOut();
  }

  public initializeUser(): Observable<User> {
    return new Observable((observer: Observer<User>) => {
      this.firebaseAuth.onAuthStateChanged((currentUser) => {
        if (currentUser) {
          observer.next({
            uid: currentUser?.uid == null ? '' : currentUser.uid,
            email: currentUser?.email == null ? '' : currentUser.email,
          });
        }
        observer.complete();
      });
    });
  }
}
