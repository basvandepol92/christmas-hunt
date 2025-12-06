import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChristmasBackgroundComponent } from './components/christmas-background/christmas-background.component';
import { APP_COPY } from './config/content.config';

const HELP_SEEN_KEY = 'christmas-hunt-help-seen';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ChristmasBackgroundComponent],
  animations: [
    trigger('fade', [
      transition(':enter', [style({ opacity: 0 }), animate('300ms ease-out', style({ opacity: 1 }))])
    ])
  ],
  template: `
    <div class="app-shell" [@fade]>
      <app-christmas-background></app-christmas-background>
      <header>
        <img class="logo" src="assets/logo.png" alt="Kerst speurtocht logo" />
      </header>

      <main class="app-main">
        <router-outlet></router-outlet>
      </main>

      <footer class="app-footer">
        <p>{{ copy.footer }}</p>
        <button class="ghost" type="button" (click)="toggleHelp()">{{ copy.helpButton }}</button>
      </footer>

      <section class="help-overlay" *ngIf="showHelp" (click)="toggleHelp()">
        <div class="help-card" (click)="$event.stopPropagation()">
          <h2>{{ copy.helpTitle }}</h2>
          <ol>
            <li *ngFor="let step of copy.helpSteps">{{ step }}</li>
          </ol>
          <button class="primary" type="button" (click)="toggleHelp()">{{ copy.helpDismiss }}</button>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showHelp = false;
  readonly copy = APP_COPY;

  ngOnInit(): void {
    if (!this.hasSeenHelp()) {
      this.showHelp = true;
      this.markHelpSeen();
    }
  }

  toggleHelp(): void {
    this.showHelp = !this.showHelp;
    if (this.showHelp) {
      this.markHelpSeen();
    }
  }

  private hasSeenHelp(): boolean {
    try {
      return localStorage.getItem(HELP_SEEN_KEY) === 'true';
    } catch {
      return false;
    }
  }

  private markHelpSeen(): void {
    try {
      localStorage.setItem(HELP_SEEN_KEY, 'true');
    } catch {
      // ignore storage issues; help will show again next time
    }
  }
}
