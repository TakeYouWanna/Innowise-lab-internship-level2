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
import { Criterion } from 'src/app/shared/interfaces/criteria.interface';
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
  public pictureList: Observable<PictureList> = this.store$.pipe(
    select(selectPictureList)
  );

  public uid$ = this.store$.pipe(select(selectUserUid));

  public uidSubscription$: Subscription;

  public criterion: Criterion = {
    limit: 10,
    type: 'uid',
    value: '',
  };

  @HostListener('window:scroll')
  public onWindowScroll(): void {
    if (
      document.scrollingElement.scrollHeight -
        document.scrollingElement.scrollTop ===
      document.scrollingElement.clientHeight
    ) {
      this.criterion.limit += 10;
      this.loadPictures();
    }
  }

  constructor(private store$: Store<State>, private actions$: Actions) {}

  public ngOnInit(): void {
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
  }

  public loadPictures(): void {
    const { criterion } = this;
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
    this.uidSubscription$.unsubscribe();
    this.store$.dispatch(clearAllPicture());
  }
}
