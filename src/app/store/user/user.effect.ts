import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { FirebaseAuthService } from 'src/app/shared/services/firebase/firebase-auth.service';
import {
  createUser,
  initializeUser,
  loadUser,
  loadUserFailure,
  loadUserSuccess,
  logOutUser,
} from './user.actions';

@Injectable()
export class UserEffect {
  loadUser$ = createEffect(() =>
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

  createUser$ = createEffect(() =>
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

  initializeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initializeUser),
      switchMap(() =>
        this.firebaseAuthService
          .initializeUser()
          .pipe(map((user) => loadUserSuccess({ user })))
      )
    )
  );

  // this effect will be used after adding other modules!

  // loadUserSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(loadUserSuccess),
  //       tap(() => this.router.navigate(['']))
  //     ),
  //   { dispatch: false }
  // );

  logOutUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logOutUser),
        tap(() => this.firebaseAuthService.logOut())
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private firebaseAuthService: FirebaseAuthService,
    private router: Router
  ) {}
}
