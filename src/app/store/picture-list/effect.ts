import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { FirebaseErrorsService } from 'src/app/shared/services/firebase/firebase-errors.service';
import { FirestoreService } from 'src/app/shared/services/firebase/firestore.service';
import { State } from '..';
import { ToastMessageType } from '../../shared/constants/message-type.constant';
import { setMessage } from '../toast-notice/actions';
import { selectUserUid } from '../user/selectors';
import {
  addPicture,
  addPictureFailure,
  addPictureSuccess,
  loadPictures,
  loadPicturesFailure,
  loadPicturesSuccess,
  removePicture,
  removePictureFailure,
  removePictureSuccess,
} from './actions';

@Injectable()
export class PictureListEffect {
  private addPicture$ = createEffect(() =>
    this.action$.pipe(
      ofType(addPicture),
      withLatestFrom(this.store$.pipe(select(selectUserUid))),
      switchMap(([action, uid]) =>
        this.firestore.addNewPicture(action.pictureSrc, uid).pipe(
          map(() => {
            const message = 'Picture added successfully';
            return addPictureSuccess({ message });
          }),
          catchError(async (error) => addPictureFailure({ error }))
        )
      )
    )
  );

  private loadPictures$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadPictures),
      switchMap((action) =>
        this.firestore.getPictures(action.criterion).pipe(
          map((newPictureList) => loadPicturesSuccess({ newPictureList })),
          catchError(async (error) => loadPicturesFailure({ error }))
        )
      )
    )
  );

  private removePicture$ = createEffect(() =>
    this.action$.pipe(
      ofType(removePicture),
      switchMap((action) =>
        this.firestore.removePicture(action.pictureId).pipe(
          map(() => {
            const message = 'Picture removed successfully';
            return removePictureSuccess({ message });
          }),
          catchError(async (error) => removePictureFailure({ error }))
        )
      )
    )
  );

  public addPictureSuccess$ = createEffect(() =>
    this.action$.pipe(
      ofType(addPictureSuccess),
      map((action) => {
        const { message } = action;
        const messageType = ToastMessageType.successfully;
        return setMessage({ message, messageType });
      })
    )
  );

  private addPictureFailure$ = createEffect(() =>
    this.action$.pipe(
      ofType(addPictureFailure),
      map((action) => {
        const message = this.firebaseErrorService.getMessageFromError(
          action.error
        );
        const messageType = ToastMessageType.error;
        return setMessage({ message, messageType });
      })
    )
  );

  private removePictureSuccess$ = createEffect(() =>
    this.action$.pipe(
      ofType(removePictureSuccess),
      map((action) => {
        const { message } = action;
        const messageType = ToastMessageType.successfully;
        return setMessage({ message, messageType });
      })
    )
  );

  private removePictureFailure$ = createEffect(() =>
    this.action$.pipe(
      ofType(removePictureFailure),
      map((action) => {
        const message = this.firebaseErrorService.getMessageFromError(
          action.error
        );
        const messageType = ToastMessageType.error;
        return setMessage({ message, messageType });
      })
    )
  );

  private loadPicturesFailure$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadPicturesFailure),
      map((action) => {
        const message = this.firebaseErrorService.getMessageFromError(
          action.error
        );
        const messageType = ToastMessageType.error;
        return setMessage({ message, messageType });
      })
    )
  );

  constructor(
    private action$: Actions,
    private firestore: FirestoreService,
    private store$: Store<State>,
    private firebaseErrorService: FirebaseErrorsService
  ) {}
}
