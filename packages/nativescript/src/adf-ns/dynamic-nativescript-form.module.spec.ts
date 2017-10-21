// tslint:disable no-implicit-dependencies
import {DynamicFormComponent} from '@angular-dynaform/core/components/dynamic-form.component';
import {DynamicFormModule} from '@angular-dynaform/core/dynamic-form.module';
import {APP_BASE_HREF} from '@angular/common';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {DynamicNativeScriptFormModule} from './dynamic-nativescript-form.module';

describe('test suite', () => {

  beforeEach((done) => {

    // tslint:disable-next-line no-floating-promises
    TestBed
        .configureTestingModule({
          imports: [RouterTestingModule, DynamicFormModule.forRoot(), DynamicNativeScriptFormModule],
          providers: [{provide: APP_BASE_HREF, useValue: '/'}]
        })
        .compileComponents()
        .then(() => done())
        .catch((e) => fail(e));

  });

  it('should create the lib', () => {
    const fixture = TestBed.createComponent(DynamicFormComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  });

});
