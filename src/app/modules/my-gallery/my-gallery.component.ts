import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Criterion } from 'src/app/shared/interfaces/criterion.interface';
import { PictureList } from 'src/app/shared/interfaces/picture-list.interface';
import { State } from 'src/app/store';
import {
  clearAllPicture,
  loadPictures,
  removePicture,
} from 'src/app/store/picture-list/actions';
import { PictureListActionsType } from 'src/app/store/picture-list/constant';
import { selectPictureList } from 'src/app/store/picture-list/selectors';
import { selectUserUid } from 'src/app/store/user/selectors';

@Component({
  selector: 'app-my-gallery',
  templateUrl: './my-gallery.component.html',
  styleUrls: ['./my-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyGalleryComponent implements OnInit, OnDestroy {
  public pictureList$: Observable<PictureList> = this.store$.pipe(
    select(selectPictureList)
  );

  private uid$ = this.store$.pipe(select(selectUserUid));

  private uidSubscription$: Subscription;

  private pictureListSubscription$: Subscription;

  private picturesUploaded: boolean;

  private currentPosition: number;

  public criterion: Criterion = {
    limit: 10,
    type: 'uid',
    value: '',
  };

  @HostListener('window:scroll', [])
  public onWindowScroll(): void {
    if (
      document.scrollingElement.scrollHeight -
        document.scrollingElement.scrollTop -
        document.scrollingElement.clientHeight <
        50 &&
      this.picturesUploaded &&
      this.currentPosition < document.scrollingElement.scrollTop
    ) {
      this.picturesUploaded = false;
      this.criterion.limit += 10;
      this.loadPictures();
    }
    this.currentPosition = document.scrollingElement.scrollTop;
  }

  constructor(private store$: Store<State>, private actions$: Actions) {}

  public ngOnInit(): void {
    this.store$.dispatch(clearAllPicture());

    this.uidSubscription$ = this.uid$.subscribe((uid) => {
      if (uid) {
        this.criterion.value = uid;
        this.loadPictures();
      }
    });

    const action = this.actions$
      .pipe(ofType(PictureListActionsType.removePictureSuccess))
      .subscribe(() => {
        this.loadPictures();
        action.unsubscribe();
      });

    this.pictureListSubscription$ = this.pictureList$.subscribe(() => {
      this.picturesUploaded = true;
    });
  }

  public loadPictures(): void {
    const criterion = { ...this.criterion };
    if (criterion.value) {
      this.store$.dispatch(loadPictures({ criterion }));
    }
  }

  public removePicture(pictureId: string): void {
    this.store$.dispatch(removePicture({ pictureId }));
  }

  public trackByObject(index: number, item: object): number {
    return index;
  }

  public ngOnDestroy(): void {
    this.pictureListSubscription$.unsubscribe();
    this.uidSubscription$.unsubscribe();
  }
}
