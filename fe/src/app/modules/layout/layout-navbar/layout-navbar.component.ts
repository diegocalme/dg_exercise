import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  faArrowUpFromBracket,
  faQrcode,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-layout-navbar',
  templateUrl: './layout-navbar.component.html',
  styleUrls: ['./layout-navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutNavbarComponent {
  public readonly faArrowUpFromBracket = faArrowUpFromBracket;
  public readonly faQrcode = faQrcode;
}
