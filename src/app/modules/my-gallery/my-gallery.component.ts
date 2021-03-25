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
import { selectUserEmail } from 'src/app/store/user/selectors';

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

  public email$ = this.store$.pipe(select(selectUserEmail));

  public emailSubscription$: Subscription;

  public criterion: Criterion = {
    limit: 10,
    type: 'author',
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
    this.emailSubscription$ = this.email$.subscribe((email) => {
      if (email) {
        this.criterion.value = email;
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

  public removePicture(id: string): void {
    this.store$.dispatch(removePicture({ id }));
  }

  public trackByObject(index: number, item: object): number {
    return index;
  }

  public ngOnDestroy(): void {
    this.emailSubscription$.unsubscribe();
    this.store$.dispatch(clearAllPicture());
  }
}
