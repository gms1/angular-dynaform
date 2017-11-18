import {Observable} from 'rxjs/Observable';

export interface Stepper {
  prev(): void;
  next(): void;
  selectionChange(): Observable<number>;
  length(): number;
}
