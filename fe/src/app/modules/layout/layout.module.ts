import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { PeopleModule } from '../people';
import { LayoutNavbarComponent } from './layout-navbar/layout-navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LayoutComponent, LayoutNavbarComponent],
  exports: [LayoutComponent],
  imports: [
    PeopleModule,
    MatSidenavModule,
    MatButtonModule,
    FontAwesomeModule,
    RouterModule,
  ],
})
export class LayoutModule {}
