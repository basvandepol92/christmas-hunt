import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { GameStateService } from '../../services/game-state.service';
import { HuntPageComponent } from './hunt-page.component';

class ActivatedRouteStub {
  private subject = new BehaviorSubject(convertToParamMap({ step: '1' }));
  readonly queryParamMap = this.subject.asObservable();
  setStep(step: string | null): void {
    this.subject.next(convertToParamMap(step ? { step } : {}));
  }
}

describe('HuntPageComponent', () => {
  let component: HuntPageComponent;
  let fixture: ComponentFixture<HuntPageComponent>;
  let routeStub: ActivatedRouteStub;

  beforeEach(async () => {
    localStorage.clear();
    routeStub = new ActivatedRouteStub();
    await TestBed.configureTestingModule({
      imports: [HuntPageComponent, NoopAnimationsModule],
      providers: [provideRouter([]), { provide: ActivatedRoute, useValue: routeStub }]
    }).compileComponents();

    fixture = TestBed.createComponent(HuntPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shows the first hint when step is missing', () => {
    const host = fixture.nativeElement as HTMLElement;
    const hint = host.querySelector('.hint-text')?.textContent ?? '';
    expect(hint).toContain('kerstboom');
    expect(component.currentStep.id).toBe(1);
  });

  it('shows a gift when step 2 is visited', () => {
    routeStub.setStep('2');
    fixture.detectChanges();

    const gift = (fixture.nativeElement as HTMLElement).querySelector('.gift-circle img');
    expect(gift).toBeTruthy();
  });

  it('updates progress count when letter unlocked', () => {
    const service = TestBed.inject(GameStateService);
    const applyVisitSpy = spyOn(service, 'applyVisit').and.callThrough();

    routeStub.setStep('2');
    fixture.detectChanges();

    expect(applyVisitSpy).toHaveBeenCalled();
    expect(component.foundCount).toBeGreaterThan(0);
  });

  it('warns when skipping a step and shows expected hint', () => {
    routeStub.setStep('3');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const warning = host.querySelector('.warning')?.textContent ?? '';
    expect(warning).toContain('overgeslagen');
    const hint = host.querySelector('.hint-text')?.textContent ?? '';
    // expected step should be 2 in this scenario
    expect(hint).toContain('open haard');
  });

  it('opens puzzle overlay when all letters collected', () => {
    routeStub.setStep('2');
    fixture.detectChanges();
    // simulate all found
    component['foundCount'] = component.totalLetters;
    component['lettersProgress'] = ['A','B','C','D','E','F','G','H','I','J','K'];
    component['shuffledLetters'] = ['A','B','C','D','E','F','G','H','I','J','K'];
    component['puzzleOpen'] = true;
    fixture.detectChanges();
    const overlay = (fixture.nativeElement as HTMLElement).querySelector('.puzzle-overlay');
    expect(overlay).toBeTruthy();
  });

  it('allows building solution via letter clicks and submit', () => {
    component.shuffledLetters = ['B','A','N','K','Z','I','T','T','E','R','S'];
    component.selectedIndices = [];
    component.puzzleOpen = true;
    fixture.detectChanges();
    'BANKZITTERS'.split('').forEach((_, idx) => component.onLetterToggle(idx));
    component.submitSolution();
    expect(component.showSuccess).toBeTrue();
    expect(component.errorMessage).toBe('');
  });

  it('shows error and clears on wrong solution', () => {
    component.puzzleOpen = true;
    component.solutionInput = 'FOUTWOORD';
    component.submitSolution();
    expect(component.errorMessage).toContain('Helaas dit woord is niet goed');
    expect(component.solutionInput).toBe('');
  });
});
