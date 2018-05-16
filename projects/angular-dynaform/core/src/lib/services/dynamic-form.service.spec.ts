import {TestBed} from '@angular/core/testing';

import {DynamicFormModule} from '../dynamic-form.module';
import {DynamicFormService} from './dynamic-form.service';

describe('dynamic-form-service test suite', () => {
  let dynaFormService: DynamicFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [], imports: [DynamicFormModule.forRoot()]});
    dynaFormService = TestBed.get(DynamicFormService);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should instantiate a DynamicFormService', () => {
    expect(dynaFormService).toBeDefined('failed to resolve DynamicFormService');
  });

});
