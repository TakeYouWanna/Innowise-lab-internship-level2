import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from 'src/app/shared/interfaces/user.interface';
import { FirebaseAuthService } from 'src/app/shared/services/firebase/firebase-auth.service';
import { FirebaseErrorsService } from 'src/app/shared/services/firebase/firebase-errors.service';
import { FirestoreService } from 'src/app/shared/services/firebase/firestore.service';
import { ToastMessageType } from '../../shared/constants/message-type.constant';
import { setMessage } from '../toast-notice/actions';
import {
  createUser,
  createUserFailure,
  createUserSuccess,
  initializeUser,
  loadUser,
  loadUserFailure,
  loadUserSuccess,
  logOutUser,
} from './actions';

@Injectable()
export class UserEffect {
  private loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      switchMap((action) =>
        this.firebaseAuthService.signIn(action.email, action.password).pipe(
          map((user) => loadUserSuccess({ user })),
          catchError(async (error) => loadUserFailure({ error }))
        )
      )
    )
  );

  private createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUser),
      switchMap((action) =>
        this.firebaseAuthService.signUp(action.email, action.password).pipe(
          map((user) => {
            const { name, password } = action;
            const { email, uid } = user;
            return createUserSuccess({ uid, email, password, name });
          }),
          catchError(async (error) => createUserFailure({ error }))
        )
      )
    )
  );

  private createUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUserSuccess),
      switchMap((action) =>
        this.firestore.addNewUser(action.uid, action.name).pipe(
          map(() => {
            const user: User = {
              uid: action.uid,
              email: action.email,
            };
            return loadUserSuccess({ user });
          })
        )
      )
    )
  );

  private createUserFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUserFailure),
      map((action) => {
        const message = this.firebaseErrorsService.getMessageFromError(
          action.error
        );
        const messageType = ToastMessageType.error;
        return setMessage({ message, messageType });
      })
    )
  );

  private initializeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initializeUser),
      switchMap(() =>
        this.firebaseAuthService
          .initializeUser()
          .pipe(map((user) => loadUserSuccess({ user })))
      )
    )
  );

  private logOutUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logOutUser),
        map(() => this.firebaseAuthService.logOut())
      ),
    { dispatch: false }
  );

  private loadUserFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserFailure),
      map((action) => {
        const message = this.firebaseErrorsService.getMessageFromError(
          action.error
        );
        const messageType = ToastMessageType.error;
        return setMessage({ message, messageType });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private firebaseAuthService: FirebaseAuthService,
    private firestore: FirestoreService,
    private firebaseErrorsService: FirebaseErrorsService
  ) {}
}
