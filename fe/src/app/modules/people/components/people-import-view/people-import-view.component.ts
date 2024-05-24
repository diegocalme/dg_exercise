import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-people-import-view',
  templateUrl: './people-import-view.component.html',
  styleUrls: [
    './people-import-view.component.scss',
    '../../../shared/styles/view-container.style.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleImportViewComponent {}
