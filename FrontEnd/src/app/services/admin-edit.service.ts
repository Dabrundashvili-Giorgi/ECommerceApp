import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminEditService {
  private editModeSource = new BehaviorSubject<boolean>(false);
  editMode$ = this.editModeSource.asObservable();

  enableEditMode() {
    this.editModeSource.next(true);
  }

  disableEditMode() {
    this.editModeSource.next(false);
  }

  toggleEditMode() {
    this.editModeSource.next(!this.editModeSource.value);
  }

  get currentState() {
    return this.editModeSource.value;
  }
}
