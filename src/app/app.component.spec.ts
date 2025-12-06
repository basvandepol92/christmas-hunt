import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [AppComponent, NoopAnimationsModule],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the logo', () => {
    const host = fixture.nativeElement as HTMLElement;
    const logo = host.querySelector<HTMLImageElement>('.logo');
    expect(logo).toBeTruthy();
    expect(logo?.src).toContain('logo.png');
  });

  it('shows help on first load and can close', () => {
    expect(component.showHelp).toBeTrue();
    const host = fixture.nativeElement as HTMLElement;
    const button = host.querySelector<HTMLButtonElement>('.help-card button');
    expect(button).toBeTruthy();
    button?.click(); // closes
    fixture.detectChanges();
    expect(component.showHelp).toBeFalse();
  });

  it('does not auto-open help after already seen', () => {
    localStorage.setItem('christmas-hunt-help-seen', 'true');
    const otherFixture = TestBed.createComponent(AppComponent);
    const instance = otherFixture.componentInstance;
    otherFixture.detectChanges();
    expect(instance.showHelp).toBeFalse();
  });
});
