import {TestBed} from '@angular/core/testing';

import {DynamicFormModule} from '../dynamic-form.module';
import {DynamicFormService} from './dynamic-form.service';



describe('test suite', () => {
  let dynaFormService: DynamicFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [], imports: [DynamicFormModule.forRoot()]});
    dynaFormService = TestBed.get(DynamicFormService);
  });

  afterEach(() => { TestBed.resetTestingModule(); });

  it('should run test1', () => { expect(dynaFormService).toBeDefined('failed to resolve DynamicFormService'); });

  it('should run test2', () => { expect(dynaFormService).toBeDefined('failed to resolve DynamicFormService'); });

  it('should run test3', () => { expect(dynaFormService).toBeDefined('failed to resolve DynamicFormService'); });

});