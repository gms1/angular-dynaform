import {Component} from '@angular/core';
import {Routes} from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
  <mat-sidenav-container class="app-root">
    <mat-sidenav #start mode="over">
      <mat-nav-list>
        <a *ngFor="let navItem of navItems"
          mat-list-item
          (click)="start.close()"
          routerLinkActive
          #routerLinkActiveInstance="routerLinkActive"
          [attr.tabindex]="routerLinkActiveInstance.isActive ? 0 : -1"
          [routerLink]="[navItem.route]">
          {{navItem.name}}
        </a>
      </mat-nav-list>
      <!-- button mat-icon-button tabindex="-1" (click)="start.close()">
        <mat-icon>close</mat-icon>
      </button -->
    </mat-sidenav>
  <div>
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="start.open('mouse')"><mat-icon>menu</mat-icon></button>
      <div class="app-toolbar">
        <h1>Angular Dynaform for Material2 - Demos</h1>
      </div>
    </mat-toolbar>
    <div class="app-content">
      <router-outlet></router-outlet>
    </div>
  </div>
</mat-sidenav-container>
`,
  styles: [],
  preserveWhitespaces: false
})
export class AppComponent {
  navItems: {name: string, route: string}[] = [{name: 'Home', route: '/'}];

  constructor() {}
}
