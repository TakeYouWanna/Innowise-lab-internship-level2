import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/gallery', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'constructor',
    loadChildren: () =>
      import('./modules/mini-paint/mini-paint.module').then(
        (m) => m.MiniPaintModule
      ),
  },
  {
    path: 'gallery',
    loadChildren: () =>
      import('./modules/gallery/gallery.module').then(
        (m) => m.PictureListModule
      ),
  },
  {
    path: 'my-gallery',
    loadChildren: () =>
      import('./modules/my-gallery/my-gallery.module').then(
        (m) => m.MyGalleryModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
