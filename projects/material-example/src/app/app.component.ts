import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-sidenav-container class="app-root">
      <mat-sidenav #start mode="over">
        <mat-nav-list>
          <h3 matSubheader>Demo Examples</h3>
          <a
            *ngFor="let navItem of navDemoItems"
            mat-list-item
            (click)="start.close()"
            routerLinkActive
            #routerLinkActiveInstance="routerLinkActive"
            [attr.tabindex]="routerLinkActiveInstance.isActive ? 0 : -1"
            [routerLink]="[navItem.route]"
          >
            {{ navItem.name }}
          </a>
          <mat-divider></mat-divider>
          <h3 matSubheader>Code Examples</h3>
          <a
            *ngFor="let navItem of navCodeItems"
            mat-list-item
            (click)="start.close()"
            routerLinkActive
            #routerLinkActiveInstance="routerLinkActive"
            [attr.tabindex]="routerLinkActiveInstance.isActive ? 0 : -1"
            [routerLink]="[navItem.route]"
          >
            {{ navItem.name }}
          </a>
        </mat-nav-list>
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
  preserveWhitespaces: false,
})
export class AppComponent {
  readonly navDemoItems: { name: string; route: string }[] = [
    { name: 'Home', route: '/' },
    { name: 'TabGroup', route: 'tabgroup' },
    { name: 'Stepper', route: 'stepper' },
  ];

  readonly navCodeItems: { name: string; route: string }[] = [
    { name: 'Basic Form', route: '/basic' },
  ];

  constructor() {}
}
