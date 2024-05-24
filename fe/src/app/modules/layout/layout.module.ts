import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { PeopleModule } from '../people';

@NgModule({
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  imports: [PeopleModule],
})
export class LayoutModule {}
