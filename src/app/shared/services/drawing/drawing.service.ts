import { ElementRef, Injectable } from '@angular/core';
import { FigureProperties } from '../../interfaces/figure-properties.interface';
import { TextProperties } from '../../interfaces/text-properties.interface';
import { DrawingMethod } from './classes/drawing-method';

@Injectable({ providedIn: 'root' })
export class DrawingService {
  constructor() {}

  public startDrawing(
    drawingMethod: string,
    canvas: ElementRef<HTMLCanvasElement>,
    context: CanvasRenderingContext2D,
    figureProperties: FigureProperties,
    textProperties: TextProperties,
    event: MouseEvent | TouchEvent
  ): void {
    const drawing = new DrawingMethod(
      canvas,
      context,
      figureProperties,
      textProperties,
      event
    );

    drawing.create(drawingMethod).startDrawing();
  }
}
