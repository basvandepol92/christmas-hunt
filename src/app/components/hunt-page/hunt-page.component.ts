import { trigger, transition, style, animate, state } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HuntStep, HUNT_STEPS } from '../../config/hunt-steps.config';
import { GameStateService } from '../../services/game-state.service';
import { ProgressPanelComponent } from '../progress-panel/progress-panel.component';

@Component({
  selector: 'app-hunt-page',
  standalone: true,
  imports: [CommonModule, ProgressPanelComponent],
  animations: [
    trigger('pageFade', [
      transition('* <=> *', [style({ opacity: 0, transform: 'translateY(8px)' }), animate('350ms ease-out')])
    ]),
    trigger('letterPop', [
      state('void', style({ opacity: 0, transform: 'scale(0.9)' })),
      transition('* => *', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('220ms ease-out', style({ transform: 'scale(1.08)', opacity: 1 })),
        animate('160ms ease-out', style({ transform: 'scale(1)' }))
      ])
    ]),
    trigger('pulse', [
      transition('* <=> *', [
        style({ transform: 'translateY(0)' }),
        animate('2000ms ease-in-out', style({ transform: 'translateY(-6px)' }))
      ])
    ])
  ],
  templateUrl: './hunt-page.component.html',
  styleUrls: ['./hunt-page.component.scss']
})
export class HuntPageComponent implements OnInit, OnDestroy {
  currentStep: HuntStep = this.gameState.getCurrentStep(1);
  animationKey = 'step-1';
  letterAnimationState = 'letter-1';
  showProgress = false;
  lettersProgress: (string | null)[] = [];
  foundCount = 0;
  totalLetters = this.gameState.getTotalLetters();
  invalidStep = false;
  recentlyFound = false;
  outOfSequence = false;
  expectedStep = 1;
  puzzleOpen = false;
  shuffledLetters: string[] = [];
  solutionInput = '';
  showSuccess = false;
  readonly targetSolution = 'BANKZITTERS';
  errorMessage = '';
  confettiPieces = Array.from({ length: 150 }).map(() => ({
    hue: Math.floor(Math.random() * 360),
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2.5 + Math.random() * 1.5
  }));
  selectedIndices: number[] = [];

  private subscription?: Subscription;

  constructor(private readonly route: ActivatedRoute, private readonly gameState: GameStateService) {}

  ngOnInit(): void {
    this.refreshProgress();
    this.subscription = this.route.queryParamMap.subscribe((params) => {
      const rawParam = params.get('step');
      const stepParam = rawParam !== null ? Number(rawParam) : null;
      const normalized = this.gameState.normalizeStepId(stepParam);
      const requestedStep = this.gameState.getCurrentStep(normalized);
      const visitResult = this.gameState.applyVisit(requestedStep.id);

      this.outOfSequence = !visitResult.allowed;
      this.expectedStep = this.gameState.getExpectedNextStep();

      const stepToShow = this.outOfSequence
        ? this.gameState.getCurrentStep(this.expectedStep)
        : requestedStep;

      this.recentlyFound = visitResult.newlyFound;

      this.invalidStep = rawParam !== null && (Number.isNaN(stepParam!) || stepParam! < 1 || stepParam! > this.totalSteps);
      this.animationKey = `step-${stepToShow.id}-${Date.now()}`;
      this.letterAnimationState = `letter-${stepToShow.id}-${Date.now()}`;
      this.currentStep = stepToShow;
      this.refreshProgress();

      if (visitResult.newlyFound) {
        // Keep progress drawer open when a new letter appears so it is visible.
        this.showProgress = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  toggleProgress(): void {
    this.showProgress = !this.showProgress;
  }

  shuffleLetters(): void {
    const arr = [...this.shuffledLetters];
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    this.shuffledLetters = arr;
    this.selectedIndices = [];
    this.solutionInput = '';
  }

  onLetterToggle(index: number): void {
    const existing = this.selectedIndices.indexOf(index);
    if (existing !== -1) {
      this.selectedIndices.splice(existing, 1);
    } else if (this.solutionInput.length < this.targetSolution.length) {
      this.selectedIndices.push(index);
    }
    this.solutionInput = this.selectedIndices.map((i) => this.shuffledLetters[i]).join('');
  }

  clearSolution(resetError: boolean = true): void {
    this.selectedIndices = [];
    this.solutionInput = '';
    if (resetError) {
      this.errorMessage = '';
    }
  }

  submitSolution(): void {
    if (this.solutionInput === this.targetSolution) {
      this.showSuccess = true;
      this.puzzleOpen = false;
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Helaas dit woord is niet goed, probeer opnieuw';
      this.clearSolution(false);
    }
  }

  private refreshProgress(): void {
    this.lettersProgress = this.gameState.getLettersProgress();
    this.foundCount = this.gameState.getFoundCount();
    if (this.foundCount === this.totalLetters && !this.showSuccess) {
      if (!this.puzzleOpen) {
        this.shuffledLetters = this.gameState.getFoundLetters();
      }
      this.puzzleOpen = true;
    }
  }

  get totalSteps(): number {
    return HUNT_STEPS.length;
  }
}
