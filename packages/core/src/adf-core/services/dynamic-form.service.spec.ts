import {APP_BASE_HREF} from '@angular/common';
import {TestBed, async} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {DynamicFormModule} from '../dynamic-form.module';
import {DynamicFormService} from './dynamic-form.service';
import {DynamicFormModelFactoryService} from './dynamic-form-model-factory.service';



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
