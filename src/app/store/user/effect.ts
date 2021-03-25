import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { FirebaseAuthService } from 'src/app/shared/services/firebase/firebase-auth.service';
import { setMessage } from '../toast-notice/actions';
import {
  createUser,
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
          map((user) => loadUserSuccess({ user })),
          catchError(async (error) => loadUserFailure({ error }))
        )
      )
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
        const { message } = action.error;
        const messageType = 'error';
        return setMessage({ message, messageType });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private firebaseAuthService: FirebaseAuthService
  ) {}
}
