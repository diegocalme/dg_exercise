import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import {
  BehaviorSubject,
  EMPTY,
  catchError,
  filter,
  switchMap,
  take,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-people-csv-importer',
  templateUrl: './people-csv-importer.component.html',
  styleUrls: ['./people-csv-importer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleCsvImporterComponent {
  constructor(private readonly peopleService: PeopleService) {}

  private readonly _selectedFile$ = new BehaviorSubject<Blob | null>(null);

  public readonly selectedFile$ = this._selectedFile$.asObservable();

  public onChangeFile(event: Event): void {
    const inputElement = event.currentTarget as HTMLInputElement;

    if (!inputElement?.files || !inputElement.files[0]) {
      return;
    }

    const file = inputElement.files[0];

    this._selectedFile$.next(file);
  }

  public onUploadFile(): void {
    this.selectedFile$
      .pipe(
        take(1),
        filter((blob) => !!blob),
        switchMap((blob) =>
          this.peopleService.createPeopleWithCsv(blob as Blob)
        ),
        catchError((error) => {
          console.error('An error occurred:', error);
          return EMPTY;
        }),
        tap((response) => console.log('SUCCESS!', response))
      )
      .subscribe();
  }
}
