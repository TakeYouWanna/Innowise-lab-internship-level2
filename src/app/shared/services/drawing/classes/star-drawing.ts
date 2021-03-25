import { Drawing } from './drawing';

export class StarDrawing extends Drawing {
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
        const middleX = startCoords.x + (to.x - startCoords.x) / 2;
        const middleY = startCoords.y + (to.y - startCoords.y) / 2;
        const outerRadius =
          Math.sqrt((to.x - startCoords.x) ** 2 + (to.y - startCoords.y) ** 2) /
          2;
        const innerRadius = outerRadius / 2;
        let rot = (Math.PI / 2) * 3;
        let x = middleX;
        let y = middleY;
        const step = Math.PI / 5;

        this.paintingKit.context.beginPath();
        this.paintingKit.context.moveTo(middleX, middleY - outerRadius);
        for (let i = 0; i < 5; i++) {
          x = middleX + Math.cos(rot) * outerRadius;
          y = middleY + Math.sin(rot) * outerRadius;
          this.paintingKit.context.lineTo(x, y);
          rot += step;

          x = middleX + Math.cos(rot) * innerRadius;
          y = middleY + Math.sin(rot) * innerRadius;
          this.paintingKit.context.lineTo(x, y);
          rot += step;
        }
        this.paintingKit.context.lineTo(middleX, middleY - outerRadius);
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
