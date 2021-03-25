import { PaintingKit } from 'src/app/shared/services/drawing/interfaces/painting-kit.interface';
import { Coordinates } from './coordinates';

export class Drawing {
  public paintingKit: PaintingKit = null;

  public coordinates = new Coordinates();

  constructor(paintingKit: PaintingKit) {
    this.paintingKit = paintingKit;
  }

  public redraw(oldContext: ImageData): void {
    this.clearDrawing();
    this.paintingKit.context.putImageData(oldContext, 0, 0);
  }

  public clearDrawing(): void {
    this.paintingKit.context.clearRect(
      0,
      0,
      this.paintingKit.canvas.nativeElement.width,
      this.paintingKit.canvas.nativeElement.height
    );
  }

  public copyDrawing(): ImageData {
    return this.paintingKit.context.getImageData(
      0,
      0,
      this.paintingKit.canvas.nativeElement.width,
      this.paintingKit.canvas.nativeElement.height
    );
  }

  public startDrawing(): void {}
}
