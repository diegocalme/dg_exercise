import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  catchError,
  filter,
  finalize,
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
export class PeopleCsvImporterComponent implements OnDestroy {
  constructor(
    private readonly peopleService: PeopleService,
    private readonly matSnackBar: MatSnackBar
  ) {}

  private readonly _selectedFile$ = new BehaviorSubject<Blob | null>(null);

  private readonly _isSubmitting$ = new BehaviorSubject<boolean>(false);

  public readonly selectedFile$ = this._selectedFile$.asObservable();

  public readonly isSubmitting$ = this._isSubmitting$.asObservable();

  public ngOnDestroy(): void {
    this._selectedFile$.complete();
    this._isSubmitting$.complete();
  }

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
        tap(() => this._isSubmitting$.next(true)),
        switchMap((blob) =>
          this.peopleService.createPeopleWithCsv(blob as Blob)
        ),
        catchError((error) => this.handleUploadError(error)),
        finalize(() => this._isSubmitting$.next(false)),
        tap((response) => this.handleUploadSuccess(response))
      )
      .subscribe();
  }

  private handleUploadError(error: unknown): Observable<never> {
    console.error('An error occurred:', error);
    this.matSnackBar.open(
      'There was an error uploading the CSV. Please try again.',
      'Dismiss',
      { duration: 5000, verticalPosition: 'top' }
    );
    return EMPTY;
  }

  private handleUploadSuccess(response: unknown): void {
    console.log('SUCCESS!', response);

    this.matSnackBar.open('People was imported successfully!', 'Close', {
      duration: 5000,
      verticalPosition: 'top',
    });
  }
}
