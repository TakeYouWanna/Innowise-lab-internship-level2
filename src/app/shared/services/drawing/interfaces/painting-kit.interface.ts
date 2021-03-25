import { ElementRef } from '@angular/core';
import { FigureProperties } from '../../../interfaces/figure-properties.interface';
import { TextProperties } from '../../../interfaces/text-properties.interface';

export interface PaintingKit {
  canvas: ElementRef<HTMLCanvasElement>;
  context: CanvasRenderingContext2D;
  event: TouchEvent | MouseEvent;
  textProperties: TextProperties;
  figureProperties: FigureProperties;
}
