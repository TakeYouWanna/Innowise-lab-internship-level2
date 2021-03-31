import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Criterion } from 'src/app/shared/interfaces/criterion.interface';
import { State } from 'src/app/store';
import {
  clearAllPicture,
  loadPictures,
} from 'src/app/store/picture-list/actions';
import { selectPictureList } from 'src/app/store/picture-list/selectors';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent implements OnInit, OnDestroy {
  public pictureList$ = this.store$.pipe(select(selectPictureList));

  public author: string;

  private picturesUploaded: boolean;

  private pictureListSubscription$: Subscription;

  private currentPosition: number;

  private criterion: Criterion = {
    limit: 10,
    type: '',
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

  constructor(private store$: Store<State>) {}

  public ngOnInit(): void {
    this.store$.dispatch(clearAllPicture());

    this.pictureListSubscription$ = this.pictureList$.subscribe(() => {
      this.picturesUploaded = true;
    });
    this.loadPictures();
  }

  public loadPictures(): void {
    const criterion = { ...this.criterion };
    this.store$.dispatch(loadPictures({ criterion }));
  }

  public loadPicturesByAuthor(): void {
    if (this.author) {
      this.criterion.type = 'author';
      this.criterion.value = this.author;
    } else {
      this.criterion.type = '';
      this.criterion.value = '';
    }
    this.loadPictures();
  }

  public trackByObject(index: number, item: object): number {
    return index;
  }

  public ngOnDestroy(): void {
    this.pictureListSubscription$.unsubscribe();
  }
}
