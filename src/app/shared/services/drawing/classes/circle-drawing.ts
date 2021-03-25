import { Drawing } from './drawing';

export class CircleDrawing extends Drawing {
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

        const radius =
          Math.sqrt((to.x - startCoords.x) ** 2 + (to.y - startCoords.y) ** 2) /
          2;
        this.paintingKit.context.arc(
          startCoords.x + (to.x - startCoords.x) / 2,
          startCoords.y + (to.y - startCoords.y) / 2,
          radius,
          0,
          2 * Math.PI
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
