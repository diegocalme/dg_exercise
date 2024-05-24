import { NgModule } from '@angular/core';
import { PeopleCsvImporterComponent } from './components/people-csv-importer/people-csv-importer.component';
import { PersonQrScannerComponent } from './components/person-qr-scanner/person-qr-scanner.component';
import { PeopleService } from './services/people.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PeopleCsvImporterComponent, PersonQrScannerComponent],
  providers: [provideHttpClient(), PeopleService],
  imports: [CommonModule],
  exports: [PeopleCsvImporterComponent, PersonQrScannerComponent],
})
export class PeopleModule {}
