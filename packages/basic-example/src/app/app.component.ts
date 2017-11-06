import {Component} from '@angular/core';
import {Routes} from '@angular/router';


// TODO: improve sidenav menu experience
@Component({
  selector: 'app-root',
  template: `
<div class="sidenav">
  <a *ngFor="let navItem of navItems"
    routerLinkActive
    #routerLinkActiveInstance="routerLinkActive"
    [attr.tabindex]="routerLinkActiveInstance.isActive ? 0 : -1"
    [routerLink]="[navItem.route]">
    {{navItem.name}}
  </a>
</div>
<div class="app-content">
  <router-outlet></router-outlet>
</div>
`,
  styles: [],
  preserveWhitespaces: false
})
export class AppComponent {
  navItems: {name: string, route: string}[] = [{name: 'Home', route: '/'}];

  constructor() {}
}
