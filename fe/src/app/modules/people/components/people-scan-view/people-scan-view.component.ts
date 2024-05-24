import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PersonModel } from '../../models/person.model';

@Component({
  selector: 'app-people-scan-view',
  templateUrl: './people-scan-view.component.html',
  styleUrls: [
    './people-scan-view.component.scss',
    '../../../shared/styles/view-container.style.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleScanViewComponent implements OnDestroy {
  private readonly _isModalVisible$ = new BehaviorSubject<boolean>(false);

  public readonly isModalVisible$ = this._isModalVisible$.asObservable();

  public ngOnDestroy(): void {
    this._isModalVisible$.complete();
  }

  public onPersonFound(personModel: PersonModel): void {
    console.log(personModel);
    this.onCloseModal();
  }

  public onOpenModal(): void {
    this._isModalVisible$.next(true);
  }

  public onCloseModal(): void {
    this._isModalVisible$.next(false);
  }
}
