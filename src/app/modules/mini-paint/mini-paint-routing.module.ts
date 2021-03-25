import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiniPaintComponent } from './mini-paint.component';

const routes: Routes = [
  {
    path: '',
    component: MiniPaintComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiniPaintRoutingModule {}
