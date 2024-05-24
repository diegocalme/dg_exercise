import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonInfoDialogData } from '../../types/person-info-dialog-data.type';

@Component({
  selector: 'app-people-info-dialog',
  templateUrl: './people-info-dialog.component.html',
  styleUrls: [
    './people-info-dialog.component.scss',
    '../../../shared/styles/view-container.style.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleInfoDialogComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<PeopleInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: PersonInfoDialogData
  ) {}

  public onClose(): void {
    this.dialogRef.close();
  }
}
