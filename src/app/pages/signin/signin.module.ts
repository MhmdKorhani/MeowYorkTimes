import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninRoutingModule } from './signin-routing.module';
import { SigninComponent } from './signin.component';
import { DefaultFormModule } from '@core/modules/default-form.module';
import { DefaultMaterialModule } from '@core/modules/default-material.module';

@NgModule({
  declarations: [
    SigninComponent
  ],
  imports: [
    CommonModule,
    SigninRoutingModule,
    DefaultFormModule,
    DefaultMaterialModule
  ]
})
export class SigninModule { }
