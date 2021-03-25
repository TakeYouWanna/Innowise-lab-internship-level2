import { Drawing } from './drawing';

export class TextDrawing extends Drawing {
  public startDrawing(): void {
    const oldContext = this.copyDrawing();
    this.coordinates
      .getDiffCurrentPosition(this.paintingKit.event, this.paintingKit.canvas)
      .subscribe(([_, to]) => {
        this.redraw(oldContext);
        if (this.paintingKit.textProperties) {
          const fontWeight = this.paintingKit.textProperties.fontWeight
            ? 'bold'
            : 'normal';
          const fontStyle = this.paintingKit.textProperties.fontCursive
            ? 'italic'
            : 'normal';
          this.paintingKit.context.fillStyle = this.paintingKit.textProperties.fontColor;
          this.paintingKit.context.font = `${fontStyle} ${fontWeight} ${this.paintingKit.textProperties.fontSize}px ${this.paintingKit.textProperties.font}`;
        }
        this.paintingKit.context.fillText(
          this.paintingKit.textProperties.text,
          to.x,
          to.y
        );
      });
  }
}
