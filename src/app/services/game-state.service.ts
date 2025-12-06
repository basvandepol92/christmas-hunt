import { Injectable } from '@angular/core';
import { HuntStep, HUNT_STEPS } from '../config/hunt-steps.config';

interface StoredState {
  foundStepIds: number[];
  highestSequentialStep: number;
}

const STORAGE_KEY = 'christmas-hunt-progress';

@Injectable({ providedIn: 'root' })
export class GameStateService {
  private readonly steps = HUNT_STEPS;
  private foundStepIds = new Set<number>();
  private highestSequentialStep = 1;

  constructor() {
    this.load();
  }

  getCurrentStep(stepFromUrl: number | null): HuntStep {
    const normalized = this.normalizeStepId(stepFromUrl);
    return this.steps[normalized - 1];
  }

  normalizeStepId(stepFromUrl: number | null): number {
    if (!stepFromUrl || Number.isNaN(stepFromUrl)) {
      return 1;
    }
    if (stepFromUrl < 1 || stepFromUrl > this.steps.length) {
      return 1;
    }
    return Math.floor(stepFromUrl);
  }

  isStepAllowed(stepId: number): boolean {
    return stepId <= this.highestSequentialStep + 1;
  }

  getExpectedNextStep(): number {
    return Math.min(this.highestSequentialStep + 1, this.steps.length);
  }

  applyVisit(stepId: number): { allowed: boolean; newlyFound: boolean } {
    if (!this.isStepAllowed(stepId)) {
      return { allowed: false, newlyFound: false };
    }
    this.highestSequentialStep = Math.max(this.highestSequentialStep, stepId);
    const newlyFound = this.markLetterFound(stepId);
    this.persist();
    return { allowed: true, newlyFound };
  }

  private markLetterFound(stepId: number): boolean {
    const step = this.steps.find((s) => s.id === stepId);
    if (!step || !step.letter) {
      return false;
    }
    if (this.foundStepIds.has(stepId)) {
      return false;
    }
    this.foundStepIds.add(stepId);
    return true;
  }

  hasFoundLetterForStep(stepId: number): boolean {
    return this.foundStepIds.has(stepId);
  }

  getFoundLetters(): string[] {
    return this.steps
      .filter((s) => s.letter && this.foundStepIds.has(s.id))
      .map((s) => s.letter!)
      .slice();
  }

  getLettersProgress(): (string | null)[] {
    return this.steps
      .filter((s) => s.letter)
      .map((s) => (this.foundStepIds.has(s.id) ? s.letter ?? null : null));
  }

  getFoundCount(): number {
    return this.foundStepIds.size;
  }

  getTotalLetters(): number {
    return this.steps.filter((s) => !!s.letter).length;
  }

  clearProgress(): void {
    this.foundStepIds.clear();
    this.highestSequentialStep = 1;
    this.persist();
  }

  private persist(): void {
    try {
      const payload: StoredState = {
        foundStepIds: Array.from(this.foundStepIds.values()),
        highestSequentialStep: this.highestSequentialStep
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.warn('Unable to persist progress', err);
    }
  }

  private load(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw) as StoredState;
      if (Array.isArray(parsed.foundStepIds)) {
        this.foundStepIds = new Set(parsed.foundStepIds);
      }
      if (parsed.highestSequentialStep && Number.isFinite(parsed.highestSequentialStep)) {
        this.highestSequentialStep = Math.max(1, Math.min(parsed.highestSequentialStep, this.steps.length));
      }
    } catch (err) {
      console.warn('Unable to read progress', err);
    }
  }
}
