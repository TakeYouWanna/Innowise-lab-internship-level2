import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MiniPaintRoutingModule } from './mini-paint-routing.module';
import { MiniPaintComponent } from './mini-paint.component';
import { DrawingPropertiesComponent } from './drawing-properties/drawing-properties.component';
import { DrawingToolsComponent } from './drawing-tools/drawing-tools.component';

@NgModule({
  imports: [CommonModule, MiniPaintRoutingModule, ReactiveFormsModule],
  declarations: [
    MiniPaintComponent,
    DrawingPropertiesComponent,
    DrawingToolsComponent,
  ],
})
export class MiniPaintModule {}
