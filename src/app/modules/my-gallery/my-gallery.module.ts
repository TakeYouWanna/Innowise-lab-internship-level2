import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MyGalleryRouterModule } from './my-gallery-routing.module';
import { MyGalleryComponent } from './my-gallery.component';

@NgModule({
  imports: [MyGalleryRouterModule, CommonModule],
  declarations: [MyGalleryComponent],
})
export class MyGalleryModule {}
