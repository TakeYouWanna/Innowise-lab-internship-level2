import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, map } from 'rxjs/operators';
import { removeMessage, setMessage } from './actions';

@Injectable()
export class ToastNoticeEffect {
  private setMessage$ = createEffect(() =>
    this.action$.pipe(
      ofType(setMessage),
      delay(5000),
      map(() => removeMessage())
    )
  );

  constructor(private action$: Actions) {}
}
