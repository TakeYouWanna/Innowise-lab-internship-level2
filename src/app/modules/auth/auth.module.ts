import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

@NgModule({
  imports: [ReactiveFormsModule, CommonModule, AuthRoutingModule],
  declarations: [AuthComponent, LoginPageComponent, RegisterPageComponent],
  providers: [],
})
export class AuthModule {}
