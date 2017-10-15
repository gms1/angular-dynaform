import {APP_BASE_HREF} from '@angular/common';
import {TestBed, ComponentFixture, async} from '@angular/core/testing';

import {DynamicFormModule} from '@angular-dynaform/core';
import {DynamicFormService} from '@angular-dynaform/core';
import {DynamicBasicFormModule} from './public_api';
import {TestFormContainerComponent} from './spec/test-form-container.component';


describe('test suite', () => {
  let fixture: ComponentFixture<TestFormContainerComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [DynamicFormModule.forRoot(), DynamicBasicFormModule],
      declarations: [TestFormContainerComponent],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    });
    fixture = TestBed.createComponent(TestFormContainerComponent);
  });

  afterEach(() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });

  it('should create the form container component', () => {
    expect(fixture).toBeDefined('fixture is not defined');
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });

});
