import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-person-qr-scanner',
  templateUrl: './person-qr-scanner.component.html',
  styleUrls: ['./person-qr-scanner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonQrScannerComponent {}
