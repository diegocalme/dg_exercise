import { Routes } from '@angular/router';
import { PeopleImportViewComponent } from '../people/components/people-import-view/people-import-view.component';
import { PeopleScanViewComponent } from '../people/components/people-scan-view/people-scan-view.component';

export const ROUTES: Routes = [
  { path: 'import', component: PeopleImportViewComponent },
  { path: 'scan', component: PeopleScanViewComponent },
  { path: '', redirectTo: '/import', pathMatch: 'full' },
  { path: '**', redirectTo: '/import' },
];
