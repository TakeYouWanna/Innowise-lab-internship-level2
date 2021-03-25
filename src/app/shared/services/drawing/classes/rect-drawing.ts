import { Drawing } from './drawing';

export class RectDrawing extends Drawing {
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
        this.paintingKit.context.rect(
          startCoords.x,
          startCoords.y,
          to.x - startCoords.x,
          to.y - startCoords.y
        );
        if (this.paintingKit.figureProperties) {
          this.paintingKit.context.lineWidth = this.paintingKit.figureProperties.lineWidth;
          this.paintingKit.context.fillStyle = this.paintingKit.figureProperties.fillColor;
          this.paintingKit.context.strokeStyle = this.paintingKit.figureProperties.lineColor;
          if (this.paintingKit.figureProperties.filling) {
            this.paintingKit.context.fill();
          }
        }
        this.paintingKit.context.stroke();
      });
  }
}
