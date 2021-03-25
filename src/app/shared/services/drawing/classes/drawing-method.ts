import { ElementRef } from '@angular/core';
import { FigureProperties } from 'src/app/shared/interfaces/figure-properties.interface';
import { PaintingKit } from 'src/app/shared/services/drawing/interfaces/painting-kit.interface';
import { TextProperties } from 'src/app/shared/interfaces/text-properties.interface';
import { BrushDrawing } from './brush-drawing';
import { LineDrawing } from './line-drawing';
import { RectDrawing } from './rect-drawing';
import { CircleDrawing } from './circle-drawing';
import { StarDrawing } from './star-drawing';
import { TextDrawing } from './text-drawing';

export class DrawingMethod {
  public paintingKit: PaintingKit = {
    canvas: null,
    context: null,
    figureProperties: null,
    textProperties: null,
    event: null,
  };

  constructor(
    canvas: ElementRef<HTMLCanvasElement>,
    context: CanvasRenderingContext2D,
    figureProperties: FigureProperties,
    textProperties: TextProperties,
    event: MouseEvent | TouchEvent
  ) {
    this.paintingKit.canvas = canvas;
    this.paintingKit.context = context;
    this.paintingKit.event = event;
    this.paintingKit.figureProperties = figureProperties;
    this.paintingKit.textProperties = textProperties;
  }

  public create(tool: string): any {
    let method;
    switch (tool) {
      case 'pencil':
        method = new BrushDrawing(this.paintingKit);
        break;
      case 'rectangle':
        method = new RectDrawing(this.paintingKit);
        break;
      case 'line':
        method = new LineDrawing(this.paintingKit);
        break;
      case 'circle':
        method = new CircleDrawing(this.paintingKit);
        break;
      case 'star':
        method = new StarDrawing(this.paintingKit);
        break;
      case 'text':
        method = new TextDrawing(this.paintingKit);
        break;
      default:
        method = new BrushDrawing(this.paintingKit);
        break;
    }
    return method;
  }
}
