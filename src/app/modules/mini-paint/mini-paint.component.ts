import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Criterion } from 'src/app/shared/interfaces/criteria.interface';
import { FigureProperties } from 'src/app/shared/interfaces/figure-properties.interface';
import { TextProperties } from 'src/app/shared/interfaces/text-properties.interface';
import { DrawingService } from 'src/app/shared/services/drawing/drawing.service';
import { FirestoreService } from 'src/app/shared/services/firebase/firestore.service';
import { State } from 'src/app/store';
import { addPicture } from 'src/app/store/picture-list/actions';
import { selectUserUid } from 'src/app/store/user/selectors';

@Component({
  selector: 'app-mini-paint',
  templateUrl: './mini-paint.component.html',
  styleUrls: ['./mini-paint.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniPaintComponent implements AfterViewInit {
  @ViewChild('canvas') public canvas: ElementRef<HTMLCanvasElement>;

  public uid$: Observable<string> = this.store$.pipe(select(selectUserUid));

  public context: CanvasRenderingContext2D;

  public figureProperties: FigureProperties;

  public textProperties: TextProperties;

  public toolName: string;

  public saving = false;

  constructor(
    private drawingService: DrawingService,
    private store$: Store<State>,
    private firestore: FirestoreService
  ) {}

  public ngAfterViewInit(): void {
    const context = this.canvas.nativeElement.getContext('2d');
    if (context !== null) {
      this.context = context;
    }
    const canvasRect = this.canvas.nativeElement.getBoundingClientRect();
    const scale = window.devicePixelRatio;
    this.canvas.nativeElement.width = canvasRect.width * scale;
    this.canvas.nativeElement.height = canvasRect.height * scale;
    this.context.scale(scale, scale);

    this.canvas.nativeElement.addEventListener('mousedown', (event) =>
      this.startDrawing(event)
    );

    this.canvas.nativeElement.addEventListener('touchstart', (event) =>
      this.startDrawing(event)
    );
  }

  public startDrawing(event: TouchEvent | MouseEvent): void {
    this.drawingService.startDrawing(
      this.toolName,
      this.canvas,
      this.context,
      this.figureProperties,
      this.textProperties,
      event
    );
  }

  public clear(): void {
    this.context.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
  }

  public save(): void {
    const pictureSrc = this.canvas.nativeElement.toDataURL('image/png');
    this.store$.dispatch(addPicture({ pictureSrc }));
  }
}
