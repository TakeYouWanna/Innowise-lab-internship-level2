import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Criterion } from 'src/app/shared/interfaces/criteria.interface';
import { PictureList } from 'src/app/shared/interfaces/picture-list.interface';
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

  public limit = 10;

  @HostListener('window:scroll')
  private onWindowScroll(): void {
    if (
      document.scrollingElement.scrollHeight -
        document.scrollingElement.scrollTop ===
      document.scrollingElement.clientHeight
    ) {
      this.limit += 10;

      this.loadPictures();
    }
  }

  constructor(private store$: Store<State>) {}

  public ngOnInit(): void {
    this.loadPictures();
  }

  public loadPictures(): void {
    let type = '';
    let value = '';
    if (this.author) {
      type = 'author';
      value = this.author;
    }
    const criterion: Criterion = {
      limit: this.limit,
      type,
      value,
    };
    this.store$.dispatch(loadPictures({ criterion }));
  }

  public trackByObject(index: number, item: object): number {
    return index;
  }

  public ngOnDestroy(): void {
    this.store$.dispatch(clearAllPicture());
  }
}
