import {Observable} from 'rxjs';

export interface Stepper {
  prev(): void;
  next(): void;
  selectionChange(): Observable<number>;
  length(): number;
}
