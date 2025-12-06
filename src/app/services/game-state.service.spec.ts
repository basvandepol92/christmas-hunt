import { TestBed } from '@angular/core/testing';
import { HUNT_STEPS } from '../config/hunt-steps.config';
import { GameStateService } from './game-state.service';

const STORAGE_KEY = 'christmas-hunt-progress';

describe('GameStateService', () => {
  let service: GameStateService;
  let store: Record<string, string>;

  beforeEach(() => {
    store = {};
    spyOn(window.localStorage, 'getItem').and.callFake((key: string) => store[key] ?? null);
    spyOn(window.localStorage, 'setItem').and.callFake((key: string, value: string) => {
      store[key] = value;
      return null;
    });
    spyOn(window.localStorage, 'removeItem').and.callFake((key: string) => {
      delete store[key];
      return null;
    });

    TestBed.configureTestingModule({});
    service = TestBed.inject(GameStateService);
  });

  it('normalizes invalid steps to step 1', () => {
    const negative = service.getCurrentStep(-5);
    const over = service.getCurrentStep(HUNT_STEPS.length + 1);
    const missing = service.getCurrentStep(null);

    expect(negative.id).toBe(1);
    expect(over.id).toBe(1);
    expect(missing.id).toBe(1);
  });

  it('marks letters as found and keeps count', () => {
    expect(service.getFoundCount()).toBe(0);
    const added = service.applyVisit(2);
    expect(added.newlyFound).toBeTrue();
    expect(service.hasFoundLetterForStep(2)).toBeTrue();
    expect(service.getFoundCount()).toBe(1);
  });

  it('does not duplicate letters on repeat visits', () => {
    service.applyVisit(2);
    service.applyVisit(2);
    expect(service.getFoundLetters()).toEqual(['S']);
    expect(service.getFoundCount()).toBe(1);
  });

  it('persists and reloads progress from localStorage', () => {
    service.applyVisit(2);
    const saved = store[STORAGE_KEY];
    expect(saved).toContain('2');

    // simulate new instance reading stored state
    store[STORAGE_KEY] = saved;
    const fresh = new GameStateService();
    expect(fresh.getFoundCount()).toBe(1);
    expect(fresh.hasFoundLetterForStep(2)).toBeTrue();
  });

  it('blocks skipping ahead and surfaces expected next step', () => {
    const result = service.applyVisit(3);
    expect(result.allowed).toBeFalse();
    expect(service.getExpectedNextStep()).toBe(2);
    expect(service.getFoundCount()).toBe(0);
  });
});
