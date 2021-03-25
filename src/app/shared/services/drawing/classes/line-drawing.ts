import { Drawing } from './drawing';

export class LineDrawing extends Drawing {
  public startDrawing(): void {
    const oldContext = this.copyDrawing();
    const startCoords = this.coordinates.getCoords(
      this.paintingKit.event,
      this.paintingKit.canvas
    );
    this.coordinates
      .getDiffCurrentPosition(this.paintingKit.event, this.paintingKit.canvas)
      .subscribe(([_, to]) => {
        this.redraw(oldContext);
        this.paintingKit.context.beginPath();
        this.paintingKit.context.moveTo(startCoords.x, startCoords.y);
        this.paintingKit.context.lineTo(to.x, to.y);
        if (this.paintingKit.figureProperties) {
          this.paintingKit.context.lineWidth = this.paintingKit.figureProperties.lineWidth;
          this.paintingKit.context.strokeStyle = this.paintingKit.figureProperties.lineColor;
        }
        this.paintingKit.context.stroke();
      });
  }
}
