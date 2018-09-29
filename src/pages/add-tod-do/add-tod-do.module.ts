import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTodDoPage } from './add-tod-do';

@NgModule({
  declarations: [
    AddTodDoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTodDoPage),
  ],
})
export class AddTodDoPageModule {}
