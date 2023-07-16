import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { DefaultFormModule } from '@core/modules/default-form.module';
import { DefaultMaterialModule } from '@core/modules/default-material.module';


@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    DefaultFormModule,
    DefaultMaterialModule
  ]
})
export class SignupModule { }
