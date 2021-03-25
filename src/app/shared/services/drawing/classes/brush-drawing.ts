import { Drawing } from './drawing';

export class BrushDrawing extends Drawing {
  public startDrawing(): void {
    this.coordinates
      .getDiffCurrentPosition(this.paintingKit.event, this.paintingKit.canvas)
      .subscribe(([from, to]) => {
        if (this.paintingKit.figureProperties) {
          this.paintingKit.context.lineWidth = this.paintingKit.figureProperties.lineWidth;
          this.paintingKit.context.strokeStyle = this.paintingKit.figureProperties.lineColor;
        }
        this.paintingKit.context.fillStyle = 'white';
        this.paintingKit.context.lineJoin = 'round';
        this.paintingKit.context.lineCap = 'round';
        this.paintingKit.context.beginPath();
        this.paintingKit.context.moveTo(from.x, from.y);
        this.paintingKit.context.lineTo(to.x, to.y);
        this.paintingKit.context.stroke();
      });
  }
}
