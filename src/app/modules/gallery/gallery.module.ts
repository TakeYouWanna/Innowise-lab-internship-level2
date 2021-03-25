import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';

@NgModule({
  imports: [CommonModule, GalleryRoutingModule, FormsModule],
  declarations: [GalleryComponent],
})
export class PictureListModule {}
