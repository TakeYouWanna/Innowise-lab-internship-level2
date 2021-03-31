import { ElementRef } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, pairwise, takeUntil } from 'rxjs/operators';
import { Coords } from 'src/app/shared/services/drawing/interfaces/coords.interface';

export class Coordinates {
  public getDiffCurrentPosition(
    $event: MouseEvent | TouchEvent,
    canvas: ElementRef<HTMLCanvasElement>
  ): Observable<[Coords, Coords]> {
    if ($event instanceof MouseEvent) {
      return this.getDiffCurrentMouseCoordinates(canvas);
    }
    return this.getDiffCurrentTouchCoordinates(canvas);
  }

  private getDiffCurrentTouchCoordinates(
    canvas: ElementRef<HTMLCanvasElement>
  ): Observable<[Coords, Coords]> {
    const touchMove$ = fromEvent(canvas.nativeElement, 'touchmove');
    const touchEnd$ = fromEvent(canvas.nativeElement, 'touchend');
    const touchCancel$ = fromEvent(canvas.nativeElement, 'touchcancel');
    return touchMove$.pipe(
      map(($event) => {
        if ($event instanceof TouchEvent) {
          $event.preventDefault();
          return {
            x:
              $event.changedTouches[0].clientX -
              canvas.nativeElement.offsetLeft,
            y:
              $event.changedTouches[0].clientY - canvas.nativeElement.offsetTop,
          };
        }
        return {
          x: 0,
          y: 0,
        };
      }),
      pairwise(),
      takeUntil(touchEnd$),
      takeUntil(touchCancel$)
    );
  }

  private getDiffCurrentMouseCoordinates(
    canvas: ElementRef<HTMLCanvasElement>
  ): Observable<[Coords, Coords]> {
    const mouseMove$ = fromEvent(canvas.nativeElement, 'mousemove');
    const mouseUp$ = fromEvent(canvas.nativeElement, 'mouseup');
    const mouseOut$ = fromEvent(canvas.nativeElement, 'mouseout');
    return mouseMove$.pipe(
      map(($event) => {
        if ($event instanceof MouseEvent) {
          $event.preventDefault();
          return {
            x: $event.offsetX,
            y: $event.offsetY,
          };
        }
        return {
          x: 0,
          y: 0,
        };
      }),
      pairwise(),
      takeUntil(mouseUp$),
      takeUntil(mouseOut$)
    );
  }

  public getCoords(
    $event: MouseEvent | TouchEvent,
    canvas: ElementRef<HTMLCanvasElement>
  ): Coords {
    if ($event instanceof MouseEvent) {
      return {
        x: $event.offsetX,
        y: $event.offsetY,
      };
    }
    return {
      x: $event.changedTouches[0].clientX - canvas.nativeElement.offsetLeft,
      y: $event.changedTouches[0].clientY - canvas.nativeElement.offsetTop,
    };
  }
}
