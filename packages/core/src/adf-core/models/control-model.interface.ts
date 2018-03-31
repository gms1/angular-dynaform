import {AbstractControl, AsyncValidatorFn, FormGroup, ValidatorFn} from '@angular/forms';
import {Observable} from 'rxjs';

import {ControlConfig} from '../config/control-config.interface';
import {ControlBaseOptions, ValueOptions} from '../config/control-options.interface';
import {ControlI18n} from '../config/control-i18n.interface';
import {DynamicFormService} from '../services/dynamic-form.service';

import {ArrayModel} from './array-model';
import {FormModel} from './form-model';
import {GroupModelBase} from './group-model';

import {CSSModel} from './css-model';

import {JsonPointer} from 'jsonpointerx';
import {JsExpression} from '../utils/js-expression';

// the root node of the model-tree is of type GroupModel without a parentGroup property
// (similar to the child nodes of the ArrayModel, see below)

export interface ControlModel {
  readonly id: string;
  readonly key: string;

  // full path as array of path segments:
  // based on the form data model (ignoring subsets)
  readonly path?: string[];

  readonly config: ControlConfig;
  readonly options: ControlBaseOptions;
  readonly ngControl: AbstractControl;
  readonly ngSubsetControl?: AbstractControl;
  readonly ngGroup?: FormGroup;

  readonly css: CSSModel;

  readonly formModel: FormModel;
  readonly parentGroup?: GroupModelBase;
  readonly parentArray?: ArrayModel;
  readonly parentArrayIdx?: number;

  readonly value: any;
  readonly valueChanges: Observable<any>;

  readonly valid: boolean;
  readonly status: string;
  readonly statusChanges: Observable<string>;

  readonly pristine: boolean;
  readonly touched: boolean;

  readonly jpForm?: JsonPointer;
  readonly jpApp?: JsonPointer;

  readonly hidden: boolean;

  readonly enableIf?: JsExpression;
  readonly showIf?: JsExpression;

  readonly local: ControlI18n;

  // all child controls by key:
  // based on the form data model (ignoring subsets)
  readonly controls: {[key: string]: ControlModel};


  setValue(value: any, options?: {onlySelf?: boolean; emitEvent?: boolean}): void;
  patchValue(value: any, options?: {onlySelf?: boolean; emitEvent?: boolean}): void;
  reset(value?: any, options?: {onlySelf?: boolean; emitEvent?: boolean}): void;

  show(): void;
  hide(): void;

  valueFromAppModel(formData: any, appData: any, appPointerPrefix?: JsonPointer): any;
  valueToAppModel(appData: any, appPointerPrefix?: JsonPointer): any;

  // get control by key:
  // based on the form data model (ignoring subsets)
  getControl(key: string): ControlModel|undefined;

  setParentGroup(parentGroup: GroupModelBase): void;
  reTranslate(): void;
  setCSSClasses(classes: {[key: string]: boolean}, setClasses: string|string[]|undefined, value: boolean): void;
}



// NOTES: currently this must be in the same source file as the ControlModel interface
export abstract class AbstractControlModel<C extends AbstractControl, O extends ControlBaseOptions> implements
    ControlModel {
  private _dynamicFormService: DynamicFormService;
  get dynamicFormService(): DynamicFormService { return this._dynamicFormService; }

  private _config: ControlConfig;
  get config(): ControlConfig { return this._config; }

  private _options: O;
  get options(): O { return this._options; }

  private _ngControl: C;
  get ngControl(): C { return this._ngControl; }

  protected _ngSubsetControl?: C;
  get ngSubsetControl(): C|undefined { return this._ngSubsetControl; }

  private _formModel: FormModel;
  get formModel(): FormModel { return this._formModel; }

  private _parentGroup?: GroupModelBase;
  get parentGroup(): GroupModelBase|undefined { return this._parentGroup; }
  get ngGroup(): FormGroup|undefined { return this._parentGroup ? this._parentGroup._ngControl : undefined; }

  private _parentArray?: ArrayModel;
  get parentArray(): ArrayModel|undefined { return this._parentArray; }

  private _parentArrayIdx?: number;
  get parentArrayIdx(): number|undefined { return this._parentArrayIdx; }

  private validatorFns: ValidatorFn[];
  private asyncValidatorFns: AsyncValidatorFn[];

  private _id!: string;
  get id(): string { return this._id; }

  private _key: string;
  get key(): string { return this._key; }

  // data model path
  private _path?: string[];
  get path(): string[]|undefined { return this._path; }

  private _jpForm?: JsonPointer;
  get jpForm(): JsonPointer|undefined {
    if (this._jpForm) {
      return this._jpForm;
    }
    if (this.path) {
      this._jpForm = new JsonPointer(this.path);
    }
    return this._jpForm;
  }

  private _jpApp: JsonPointer|undefined;
  get jpApp(): JsonPointer|undefined { return this._jpApp; }

  // getters/setters from ngControl:
  get value(): any { return this.ngControl.value; }
  get valueChanges(): Observable<any> { return this.ngControl.valueChanges; }

  get valid(): boolean { return this.ngControl.valid; }
  get status(): string { return this.ngControl.status; }
  get statusChanges(): Observable<string> { return this.ngControl.statusChanges; }

  get pristine(): boolean { return this.ngControl.pristine; }
  get touched(): boolean { return this.ngControl.touched; }

  private _css!: CSSModel;
  get css(): CSSModel { return this._css; }

  get disabled(): boolean { return this.ngControl.disabled; }

  private _hidden: boolean;
  get hidden(): boolean { return this._hidden; }

  private _enableIf?: JsExpression;
  get enableIf(): JsExpression|undefined { return this._enableIf; }

  private _showIf?: JsExpression;
  get showIf(): JsExpression|undefined { return this._showIf; }


  private _local: ControlI18n;
  get local(): ControlI18n { return this._local; }

  private _controls: {[key: string]: ControlModel};
  get controls(): {[key: string]: ControlModel} { return this._controls; }

  constructor(
      dynamicFormService: DynamicFormService, config: ControlConfig, options: O, ngControl: C, formModel: FormModel,
      parentPath?: string[], parentGroup?: GroupModelBase, parentArray?: ArrayModel, parentArrayIdx?: number) {
    this._dynamicFormService = dynamicFormService;
    this._config = config;
    this._options = options;
    this._config.options = this._options;
    this._ngControl = ngControl;
    this._formModel = formModel;
    this._parentGroup = parentGroup;
    this._parentArray = parentArray;
    this._parentArrayIdx = parentArrayIdx;
    this._key = this.config.key || this.config.id;
    this._local = {};
    this.validatorFns = [];
    this.asyncValidatorFns = [];
    this._hidden = false;
    this._controls = {};
    this.initPath(parentPath);
    this.initId();
    this.initJpApp();
    this.initCSSModel();
    this.initRelations();
    this.initTranslate();
    this._hidden = !!this.config.hidden;
  }


  setValue(value: any, options?: {onlySelf?: boolean; emitEvent?: boolean}): void {
    this.ngControl.setValue(value, options);
  }
  patchValue(value: any, options?: {onlySelf?: boolean; emitEvent?: boolean}): void {
    this.ngControl.patchValue(value, options);
  }
  reset(value?: any, options?: {onlySelf?: boolean; emitEvent?: boolean}): void {
    this.ngControl.reset(value, options);
  }

  getControl(key: string): ControlModel|undefined { return this.controls[key]; }

  setParentGroup(parentGroup: GroupModelBase): void {
    this._parentGroup = parentGroup;
    this._parentArray = parentGroup.parentArray;
    this._parentArrayIdx = parentGroup.parentArrayIdx;
    this.initId();
  }

  reTranslate(): void { this.initTranslate(); }

  protected createValidators(): void {
    this.ngControl.clearValidators();
    if (this.config.validators) {
      this.validatorFns = this.dynamicFormService.validatorFn.validateWrap(this, this.config.validators, 0);
      this.ngControl.setValidators(this.validatorFns);
    }
  }

  protected createAsyncValidators(): void {
    this.ngControl.clearAsyncValidators();
    if (this.config.asyncValidators) {
      this.asyncValidatorFns =
          this.dynamicFormService.asyncValidatorFn.validateWrap(this, this.config.asyncValidators, 0);
      this.ngControl.setAsyncValidators(this.asyncValidatorFns);
    }
  }

  private initPath(parentPath?: string[]): void {
    if (!parentPath) {
      if (!this.parentGroup && !this.parentArray) {
        // root GroupModel
        this._path = [];
      }
      return;
    }
    if (this.parentGroup && this.ngControl as AbstractControl === this.parentGroup.ngControl) {
      // SubsetModel
      this._path = parentPath;
    } else {
      this._path = parentPath.concat(this.key);
    }
  }

  private initId(): void {
    if (this.parentArray) {
      this._id = this.parentArray.getId(this.config.id, this.parentArrayIdx || 0, this.parentGroup);
    } else {
      this._id = this.config.id;
    }
  }


  private initJpApp(): void {
    if (this.config.jp) {
      let jpSuffix = this.config.jp.substr(0, 1) === '/' ? this.config.jp : '/' + this.config.jp;
      if (this.config.jp !== jpSuffix || this.parentArray) {
        // relative path
        let parentJp: JsonPointer|undefined;
        let parentGroup: GroupModelBase|undefined = this.parentGroup;
        while (parentGroup && !parentJp) {
          parentJp = parentGroup.jpApp;
          parentGroup = parentGroup.parentGroup;
        }
        if (!parentJp) {
          throw new Error(`relative JSON pointer defined for control '${this.config.id}'`);
        }
        this._jpApp = parentJp.concat(JsonPointer.compile(jpSuffix));
      } else {
        // absolute path
        this._jpApp = JsonPointer.compile(this.config.jp);
      }
    } else {
      // tslint:disable-next-line: triple-equals
      if (!this.parentGroup && this.parentArray && this.parentArray.jpApp && this.parentArrayIdx != undefined &&
          this.parentArrayIdx >= 0) {
        // FormGroup item of FormArray having JSON pointer
        this._jpApp = this.parentArray.jpApp.concat(JsonPointer.compile(`/${this.parentArrayIdx}`));
      }
    }
  }

  private initCSSModel(): void {
    this._css = {container: {}, control: {}, content: {}, error: {}, label: {}};
    this.setCSSClasses(this._css.container, 'adf-container');
    this.setCSSClasses(this._css.control, 'adf-control');
    this.setCSSClasses(this._css.content, 'adf-content');
    this.setCSSClasses(this._css.error, 'adf-error');
    this.setCSSClasses(this._css.label, 'adf-label');

    if (!this.options.css) {
      return;
    }
    this.setCSSClasses(this._css.container, this.options.css.container);
    this.setCSSClasses(this._css.control, this.options.css.control);
    this.setCSSClasses(this._css.content, this.options.css.content);
    this.setCSSClasses(this._css.error, this.options.css.error);
    this.setCSSClasses(this._css.label, this.options.css.label);
  }

  setCSSClasses(classes: {[key: string]: boolean}, setClasses: string|string[]|undefined, value: boolean = true): void {
    if (!setClasses) {
      return;
    }
    if (Array.isArray(setClasses)) {
      setClasses.forEach((key) => classes[key] = value);
    } else {
      classes[setClasses] = value;
    }
  }

  protected initTranslate(): void {
    if (!this._formModel.i18n || !this._formModel.i18n.controls[this.config.id]) {
      // initialize using the defaults from the form configuration
      this.local.errors = this.config.errors;
      this.local.label = this.options.label;
      this.local.placeholder = this.options.placeholder;
      this.local.valueOptions = [];
      if (this.options.valueOptions) {
        this.options.valueOptions.forEach((opt: ValueOptions) => {
          // type assertion is not necessary, but tsc wants it
          // tslint:disable-next-line no-unnecessary-type-assertion
          (this.local.valueOptions as ValueOptions[]).push({value: opt.value, label: opt.label});
        });
      }
      return;
    }
    // initialize using the i18n translations
    const i18n = this._formModel.i18n.controls[this.config.id];
    this.local.errors = i18n.errors;
    this.local.label = i18n.label;
    this.local.placeholder = i18n.placeholder;
    this.local.valueOptions = [];
    if (this.options.valueOptions) {
      (this.options.valueOptions as ValueOptions[]).forEach((opt) => {});
      let optionsMap: Map<any, string> = new Map();
      if (i18n.valueOptions) {
        i18n.valueOptions.forEach((opt) => { optionsMap.set(opt.value, opt.label); });
      }
      (this.options.valueOptions as ValueOptions[]).forEach((opt) => {
        if (optionsMap.has(opt.value)) {
          // type assertion is not necessary, but tsc wants it
          // tslint:disable-next-line no-unnecessary-type-assertion
          (this.local.valueOptions as ValueOptions[])
              .push({value: opt.value, label: optionsMap.get(opt.value) as string});
        } else {
          // type assertion is not necessary, but tsc wants it
          // tslint:disable-next-line no-unnecessary-type-assertion
          (this.local.valueOptions as ValueOptions[]).push({value: opt.value, label: opt.label});
        }
      });
    }
  }

  protected initRelations(): void {
    if (!this.config.relations) {
      return;
    }
    if (this.config.relations.show) {
      this._showIf = JsExpression.compile(this.config.relations.show);
    }
    if (this.config.relations.enable) {
      this._enableIf = JsExpression.compile(this.config.relations.enable);
    }
  }

  valueFromAppModel(formData: any, appData: any, appPointerPrefix?: JsonPointer): any { return formData; }
  valueToAppModel(appData: any, appPointerPrefix?: JsonPointer): any { return appData; }

  show(): void { this._hidden = false; }
  hide(): void { this._hidden = true; }

  enable(): void { this.ngControl.enable(); }
  disable(): void { this.ngControl.disable(); }
}
