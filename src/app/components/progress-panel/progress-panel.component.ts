import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-panel.component.html',
  styleUrls: ['./progress-panel.component.scss']
})
export class ProgressPanelComponent {
  @Input() letters: (string | null)[] = [];
  @Input() foundCount = 0;
  @Input() totalLetters = 0;
}
