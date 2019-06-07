import {
  ControlType,
  DynamicForm,
  DynamicFormControl,
  DynamicFormService,
  FormBaseConfig,
  FormBuilder,
  FormModel,
  FormBuilderSubset,
} from '@angular-dynaform/core';
import { AfterViewInit, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'application';

const DISABLE_CONTROL_ID = 'disable_switch';
const HIDE_CONTROL_ID = 'hide_switch';

export abstract class FormTestBaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DynamicForm) form!: DynamicForm;
  model: FormModel;
  unsubscribe: Subject<any>;

  controlId: string;
  controlComponent!: DynamicFormControl;

  constructor(
    public dynamicFormService: DynamicFormService,
    public formBuilder: FormBuilder,
    public title: string,
    formBaseConfig: FormBaseConfig,
  ) {
    console.log(`INSTANTIATION ${formBaseConfig.id}`);
    this.unsubscribe = new Subject<any>();

    const formConfig = formBuilder.createForm(formBaseConfig);
    // create divisions:
    const fieldsdiv = formConfig.group.addSubset({
      id: 'fields',
      controlType: ControlType.CONTROL_DIVISION,
    });
    formConfig.group.addSeparator({
      id: 'separatorDivisions',
      controlType: ControlType.CONTROL_SEPARATOR,
      options: { css: { container: 'hr-light m-10' } },
    });
    const buttondiv = formConfig.group.addSubset({
      id: 'buttondivision',
      controlType: [ControlType.CONTROL_DIVISION],
      options: { css: { content: 'button-division-content' } },
    });

    // add control fieds to the fields division:
    this.addControl(fieldsdiv);
    if (fieldsdiv.group.group.length >= 1 && fieldsdiv.group.group[0].config.id) {
      if (fieldsdiv.group.group.length > 1) {
        console.warn('more than one test control configurations found');
      }
    } else {
      throw new Error('missing test control config (id)');
    }
    const control = fieldsdiv.group.group[0];
    this.controlId = control.config.id as string;
    if (!control.config.relations) {
      control.config.relations = { enable: `!${DISABLE_CONTROL_ID}`, show: `!${HIDE_CONTROL_ID}` };
    }

    // add controls to the button division:
    buttondiv.group.addButton({
      id: 'clear',
      controlType: ControlType.CONTROL_BUTTON,
      options: { label: 'Clear' },
      action: 'clear',
    });

    buttondiv.group.addSeparator({
      id: 'separatorMainButtons',
      controlType: ControlType.CONTROL_SEPARATOR,
      options: { css: { container: 'hr-light m-10' } },
    });

    buttondiv.group.addButton({
      id: 'reset',
      controlType: ControlType.CONTROL_BUTTON,
      options: { label: 'Reset' },
      action: 'reset',
    });
    buttondiv.group.addButton({
      id: 'submit',
      controlType: ControlType.CONTROL_BUTTON,
      options: { label: 'Submit' },
      action: 'submit',
    });

    buttondiv.group.addSeparator({
      id: 'separatorSwitchControls',
      controlType: ControlType.CONTROL_SEPARATOR,
      options: { css: { container: 'hr-light m-10' } },
    });

    buttondiv.group.addControl({
      id: DISABLE_CONTROL_ID,
      controlType: ControlType.CONTROL_SWITCH,
      updateOn: 'change',
      options: { value: false, label: 'disable' },
    });
    buttondiv.group.addControl({
      id: HIDE_CONTROL_ID,
      controlType: ControlType.CONTROL_SWITCH,
      updateOn: 'change',
      options: { value: false, label: 'hide' },
    });
    this.model = this.dynamicFormService.createFormModel(formConfig.toFormConfig());
  }

  abstract addControl(fieldsdiv: FormBuilderSubset): void;

  ngOnInit(): void {
    console.log(`INITIALIZE ${this.model.config.id}`);
  }

  ngAfterViewInit(): void {
    console.log(`VIEW INITIALIZED ${this.model.config.id}`);
    this.controlComponent = this.form.findComponentById(this.controlId) as DynamicFormControl;

    // css classes on view
    const cssClasses = Array.from(this.controlComponent.elementRef.nativeElement.cssClasses);
    console.log(`  css classes: ${cssClasses}`);

    // control value
    console.log(`control value: `, JSON.stringify(this.controlComponent.model.value));
    this.controlComponent.model.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((value) => {
        console.log(`control value: `, JSON.stringify(value));
      });

    // control state
    console.log(
      `control state: ${this.controlComponent.model.status}, touched: ${this.controlComponent.model.touched}, pristine: ${this.controlComponent.model.pristine}`,
    );
    this.controlComponent.model.statusChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((state) => {
        console.log(
          `control state: ${state}, touched: ${this.controlComponent.model.touched}, pristine: ${this.controlComponent.model.pristine}`,
        );
      });

    // control focus
    this.controlComponent.focusChanges.pipe(takeUntil(this.unsubscribe)).subscribe((focus) => {
      console.log(`control focus: ${focus}`);
    });

    // done
    console.log(`COMPONENT INITIALIZED ${this.model.config.id}`);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onSubmit(): void {
    console.log(`SUBMITTED ${this.model.config.id}`);
    console.log('  form model: ', JSON.stringify(this.form.value, undefined, 2));
  }

  onReset(): void {
    console.log(`RESETTED ${this.model.config.id}`);
    console.log('  form model: ', JSON.stringify(this.form.value, undefined, 2));
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }
}
