import { NgModule } from '@angular/core';
import { PeopleCsvImporterComponent } from './components/people-csv-importer/people-csv-importer.component';
import { PersonQrScannerComponent } from './components/person-qr-scanner/person-qr-scanner.component';
import { PeopleService } from './services/people.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PeopleImportViewComponent } from './components/people-import-view/people-import-view.component';
import { PeopleScanViewComponent } from './components/people-scan-view/people-scan-view.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MatDialogModule } from '@angular/material/dialog';
import { PeopleInfoDialogComponent } from './components/people-info-dialog/people-info-dialog.component';

@NgModule({
  declarations: [
    PeopleCsvImporterComponent,
    PersonQrScannerComponent,
    PeopleImportViewComponent,
    PeopleScanViewComponent,
    PeopleInfoDialogComponent,
  ],
  providers: [provideHttpClient(), PeopleService],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    ZXingScannerModule,
  ],
  exports: [
    PeopleCsvImporterComponent,
    PersonQrScannerComponent,
    PeopleImportViewComponent,
    PeopleScanViewComponent,
    PeopleInfoDialogComponent,
  ],
})
export class PeopleModule {}
