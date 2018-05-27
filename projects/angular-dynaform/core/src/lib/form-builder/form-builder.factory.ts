// tslint:disable no-use-before-declare
import {
  ControlBaseOptions,
  ControlConfig,
  ControlType,
  FormBaseConfig,
  FormConfig,
  GroupOptions,
  ModelType
} from '../config';
import {clone} from '../utils/clone';

// ---------------------------------------------------------------
export class FormBuilderFactory {
  createForm(config: FormBaseConfig): FormBuilderForm {
    return new FormBuilderForm(this, config);
  }

  createGroup(config?: Partial<ControlConfig>): FormBuilderGroup {
    return new FormBuilderGroup(this, config);
  }

  createSubset(config?: Partial<ControlConfig>): FormBuilderSubset {
    return new FormBuilderSubset(this, config);
  }

  createArray(config?: Partial<ControlConfig>): FormBuilderArray {
    return new FormBuilderArray(this, config);
  }

  createValueControl(config?: Partial<ControlConfig>): FormBuilderValueControl {
    return new FormBuilderValueControl(this, config);
  }

  createButtonControl(config?: Partial<ControlConfig>): FormBuilderButtonControl {
    return new FormBuilderButtonControl(this, config);
  }

  createSeparatorControl(config?: Partial<ControlConfig>): FormBuilderSeparatorControl {
    return new FormBuilderSeparatorControl(this, config);
  }

  createGroupBuilder(): FormBuilderGroupBuilder {
    return new FormBuilderGroupBuilder(this);
  }
  }


// ---------------------------------------------------------------
export class FormBuilderObject {
  private _factory: FormBuilderFactory;
  get factory(): FormBuilderFactory {
    return this._factory;
  }

  constructor(factory: FormBuilderFactory) {
    this._factory = factory;
  }
  }


// ---------------------------------------------------------------
export abstract class FormBuilderAbstractControl extends FormBuilderObject {
  protected _config: Partial<ControlConfig>;

  abstract get config(): Partial<ControlConfig>;

  get options(): Partial<ControlBaseOptions> {
    if (!this._config.options) {
      this._config.options = {};
      }
    return this._config.options;
  }

  constructor(factory: FormBuilderFactory, config: Partial < ControlConfig >= {}) {
    super(factory);
    this._config = clone(config);
  }

  abstract toControlConfig(): ControlConfig;
  }


// ---------------------------------------------------------------
export class FormBuilderGroupBuilder extends FormBuilderObject {
  protected _options: Partial<ControlBaseOptions>;
  get options(): Partial<ControlBaseOptions> {
    return this._options;
  }

  private _group: FormBuilderAbstractControl[];
  get group(): FormBuilderAbstractControl[] {
    return this._group;
  }

  constructor(factory: FormBuilderFactory) {
    super(factory);
    this._group = [];
    this._options = {};
  }

  addGroup(config?: Partial<ControlConfig>): FormBuilderGroup {
    const item = this.factory.createGroup(config);
    this.group.push(item);
    return item;
  }

  addSubset(config?: Partial<ControlConfig>): FormBuilderSubset {
    const item = this.factory.createSubset(config);
    this.group.push(item);
    return item;
  }

  addArray(config?: Partial<ControlConfig>): FormBuilderArray {
    const item = this.factory.createArray(config);
    this.group.push(item);
    return item;
  }

  addControl(config?: Partial<ControlConfig>): FormBuilderValueControl {
    const item = this.factory.createValueControl(config);
    this.group.push(item);
    return item;
  }

  addButton(config?: Partial<ControlConfig>): FormBuilderButtonControl {
    const item = this.factory.createButtonControl(config);
    this.group.push(item);
    return item;
  }

  addSeparator(config?: Partial<ControlConfig>): FormBuilderSeparatorControl {
    const item = this.factory.createSeparatorControl(config);
    this.group.push(item);
    return item;
  }

  toControlConfigArray(): ControlConfig[] {
    const group: ControlConfig[] = [];
    this.group.forEach((ctrl) => {
      group.push(ctrl.toControlConfig());
    });
    return group;
  }

  toGroupOptions(): GroupOptions|undefined {
    if (this.group.length === 0 && Object.entries(this.options).length === 0) {
      return undefined;
      }
    const options = clone(this.options);
    options.group = this.toControlConfigArray();
    return options;
  }
  }


// ---------------------------------------------------------------
export class FormBuilderGroup extends FormBuilderAbstractControl {
  private _group: FormBuilderGroupBuilder;
  get group(): FormBuilderGroupBuilder {
    return this._group;
  }
  get config(): Partial<ControlConfig> {
    this._config.modelType = ModelType.MODEL_GROUP;
    return this._config;
  }

  constructor(factory: FormBuilderFactory, config: Partial < ControlConfig >= {}) {
    super(factory, config);
    this._group = this.factory.createGroupBuilder();
  }

  toControlConfig(): ControlConfig {
    const config = clone(this.config);
    config.options.group = this.group.toControlConfigArray();
    return config;
  }
  }

// ---------------------------------------------------------------
export class FormBuilderSubset extends FormBuilderAbstractControl {
  private _group: FormBuilderGroupBuilder;
  get group(): FormBuilderGroupBuilder {
    return this._group;
  }
  get config(): Partial<ControlConfig> {
    this._config.modelType = ModelType.MODEL_SUBSET;
    return this._config;
  }

  constructor(factory: FormBuilderFactory, config: Partial < ControlConfig >= {}) {
    super(factory, config);
    this._group = this.factory.createGroupBuilder();
  }

  toControlConfig(): ControlConfig {
    const config = clone(this.config);
    config.options = config.options || {};
    config.options.group = this.group.toControlConfigArray();
    return config;
  }
  }

// ---------------------------------------------------------------
export class FormBuilderArray extends FormBuilderAbstractControl {
  private _header: FormBuilderGroupBuilder;
  get header(): FormBuilderGroupBuilder {
    return this._header;
  }

  private _footer: FormBuilderGroupBuilder;
  get footer(): FormBuilderGroupBuilder {
    return this._footer;
  }

  private _group: FormBuilderGroupBuilder;
  get group(): FormBuilderGroupBuilder {
    return this._group;
  }

  get config(): Partial<ControlConfig> {
    this._config.modelType = ModelType.MODEL_ARRAY;
    return this._config;
  }

  constructor(factory: FormBuilderFactory, config: Partial < ControlConfig >= {}) {
    super(factory, config);
    this._group = this.factory.createGroupBuilder();
    this._header = this.factory.createGroupBuilder();
    this._footer = this.factory.createGroupBuilder();
  }

  toControlConfig(): ControlConfig {
    const config = clone(this.config);
    config.options = config.options || {};
    const headerOptions = this.header.toGroupOptions();
    const itemOptions = this.group.toGroupOptions();
    const footerOptions = this.footer.toGroupOptions();

    if (headerOptions) {
      config.options.header = headerOptions;
      }
    if (itemOptions) {
      config.options.item = itemOptions;
      }
    if (footerOptions) {
      config.options.footer = footerOptions;
      }
    return config;
  }
  }

// ---------------------------------------------------------------
export class FormBuilderValueControl extends FormBuilderAbstractControl {
  get config(): Partial<ControlConfig> {
    this._config.modelType = ModelType.MODEL_VALUE;
    return this._config;
  }

  constructor(factory: FormBuilderFactory, config: Partial < ControlConfig >= {}) {
    super(factory, config);
  }

  toControlConfig(): ControlConfig {
    const config = clone(this.config);
    return config;
  }
  }

// ---------------------------------------------------------------
export class FormBuilderButtonControl extends FormBuilderAbstractControl {
  get config(): Partial<ControlConfig> {
    this._config.modelType = ModelType.MODEL_NULL;
    return this._config;
  }

  constructor(factory: FormBuilderFactory, config: Partial < ControlConfig >= {}) {
    super(factory, config);
    this.config.controlType = ControlType.CONTROL_BUTTON;  // allow overwrite
  }

  toControlConfig(): ControlConfig {
    const config = clone(this.config);
    return config;
  }
  }

// ---------------------------------------------------------------
export class FormBuilderSeparatorControl extends FormBuilderAbstractControl {
  get config(): Partial<ControlConfig> {
    this._config.modelType = ModelType.MODEL_NULL;
    return this._config;
  }

  constructor(factory: FormBuilderFactory, config: Partial < ControlConfig >= {}) {
    super(factory, config);
    this.config.controlType = ControlType.CONTROL_SEPARATOR;  // allow overwrite
  }

  toControlConfig(): ControlConfig {
    const config = clone(this.config);
    return config;
  }
  }

// ---------------------------------------------------------------
export class FormBuilderForm {
  private _factory: FormBuilderFactory;
  get factory(): FormBuilderFactory {
    return this._factory;
  }
  private _config: FormBaseConfig;
  get config(): FormBaseConfig {
    return this._config;
  }

  private _group: FormBuilderGroupBuilder;
  get group(): FormBuilderGroupBuilder {
    return this._group;
  }

  constructor(factory: FormBuilderFactory, config: FormBaseConfig) {
    this._factory = factory;
    this._config = clone(config);
    this._group = this.factory.createGroupBuilder();
  }

  toFormConfig(): FormConfig {
    const config = clone(this.config);
    config.options = this.group.toGroupOptions();
    return config;
  }
}
