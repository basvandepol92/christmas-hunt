import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressPanelComponent } from './progress-panel.component';

describe('ProgressPanelComponent', () => {
  let component: ProgressPanelComponent;
  let fixture: ComponentFixture<ProgressPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressPanelComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressPanelComponent);
    component = fixture.componentInstance;
    component.letters = ['A', null, 'C'];
    component.foundCount = 2;
    component.totalLetters = 3;
    fixture.detectChanges();
  });

  it('renders the correct progress numbers', () => {
    const headerText = (fixture.nativeElement as HTMLElement).querySelector('h3')?.textContent ?? '';
    expect(headerText).toContain('2 / 3');
    expect(headerText).toContain('letters');
  });

  it('shows gifts for found letters and locks for locked', () => {
    const slots = (fixture.nativeElement as HTMLElement).querySelectorAll('.letter-slot');
    expect(slots.length).toBe(3);
    expect(slots.item(0).querySelector('img')).toBeTruthy();
    expect(slots.item(1).querySelector('.lock')).toBeTruthy();
    expect(slots.item(2).querySelector('img')).toBeTruthy();
  });
});
