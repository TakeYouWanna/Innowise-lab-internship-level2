import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, map } from 'rxjs/operators';
import { loadUserFailure } from '../user/user.actions';
import { removeMessage, setMessage } from './toast-notice.actions';

@Injectable()
export class ToastNoticeEffect {
  setMessage$ = createEffect(() =>
    this.action$.pipe(
      ofType(setMessage),
      delay(4000),
      map(() => removeMessage())
    )
  );

  errorAppearance$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadUserFailure),
      map((error) => setMessage(error))
    )
  );

  constructor(private action$: Actions) {}
}
