import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { State } from 'src/app/store';
import { PictureListActionsType } from 'src/app/store/picture-list/constant';
import { selectUserUid } from 'src/app/store/user/selectors';

@Component({
  selector: 'app-drawing-tools',
  templateUrl: './drawing-tools.component.html',
  styleUrls: ['./drawing-tools.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawingToolsComponent implements OnInit, OnDestroy {
  public toolsList: { [tool: string]: string } = {};

  public uid$ = this.store$.pipe(select(selectUserUid));

  public saving: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  @Input()
  public toolName: string;

  @Output()
  public toolNameChange: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public drawingSave: EventEmitter<null> = new EventEmitter<null>();

  @Output()
  public drawingClear: EventEmitter<null> = new EventEmitter<null>();

  constructor(private store$: Store<State>, private actions$: Actions) {}

  public ngOnInit(): void {
    this.toolsList.brush = '../../../../assets/icons/brush.png';
    this.toolsList.rectangle = '../../../../assets/icons/rect.png';
    this.toolsList.line = '../../../../assets/icons/line.png';
    this.toolsList.circle = '../../../../assets/icons/circle.png';
    this.toolsList.star = '../../../../assets/icons/star.png';
    this.toolsList.text = '../../../../assets/icons/text.png';
  }

  public save(): void {
    this.drawingSave.emit();
    this.saving.next(true);
    this.actions$
      .pipe(ofType(PictureListActionsType.addPictureSuccess))
      .subscribe(() => {
        this.saving.next(false);
      });
  }

  public trackByObject(index: number, item: object): number {
    return index;
  }

  public ngOnDestroy(): void {
    this.saving.complete();
  }
}
