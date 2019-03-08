// tslint:disable no-empty-interface

// predefined classes:
//   on all components:
//     'adf-container', 'adf-control', 'adf-content', 'adf-error' and 'adf-label'
//   on the form-control-component:
//     'adf-form-container', 'adf-form-control', 'adf-form-content', 'adf-form-error'
//   on all group-components:
//     'adf-group-container', 'adf-group-control', 'adf-group-content', 'adf-group-error' and 'adf-group-label'
//   on all array-components:
//     'adf-array-container', 'adf-array-control', 'adf-array-content', 'adf-array-error' and 'adf-array-label'
//   on all array-header sections:
//     'adf-header-content'
//   on all array footer sections:
//     'adf-footer-content'
//   on all array-item sections:
//     'adf-array-item' and 'adf-array-item-selected' if the item is selected
//   on all non-group- and non-array- components:
//     'adf-control-container', 'adf-control-control', 'adf-control-content', 'adf-control-error' and
//     'adf-control-label'
//
//
// NOTES:
// all '*-container' and '*-error' classes  are set programmatically on the host element of the component
// all '*-control', '*-content' and '*-label' classes are set via [ngClass] directive inside the template

//
// define additional CSS classes:
//
export interface ControlCssOptions {
  container?: string | string[];
  control?: string | string[];
  content?: string | string[]; // only used for arrays and groups
  error?: string | string[];
  label?: string | string[];
}
