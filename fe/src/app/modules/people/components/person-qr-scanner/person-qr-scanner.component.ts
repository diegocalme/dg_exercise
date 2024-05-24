import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  catchError,
  filter,
  finalize,
  take,
  tap,
} from 'rxjs';
import { PersonModel } from '../../models/person.model';
import { PeopleService } from '../../services/people.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-person-qr-scanner',
  templateUrl: './person-qr-scanner.component.html',
  styleUrls: ['./person-qr-scanner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonQrScannerComponent implements OnDestroy {
  @Output() private readonly close = new EventEmitter<void>();

  @Output() private readonly personFound = new EventEmitter<PersonModel>();

  private readonly _isSubmitting$ = new BehaviorSubject<boolean>(false);

  public readonly isSubmitting$ = this._isSubmitting$.asObservable();

  constructor(
    private readonly peopleService: PeopleService,
    private readonly matSnackBar: MatSnackBar
  ) {}

  public ngOnDestroy(): void {
    this._isSubmitting$.complete();
  }

  public onCloseModal(): void {
    this.close.emit();
  }

  public onScan(personId: string): void {
    this._isSubmitting$.next(true);

    this.peopleService
      .getPerson(personId)
      .pipe(
        take(1),
        filter((person) => !!person),
        catchError((error) => this.handleUploadError(error)),
        finalize(() => this._isSubmitting$.next(false))
      )
      .subscribe((personModel) => {
        this.personFound.emit(personModel as PersonModel);
      });
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
}
