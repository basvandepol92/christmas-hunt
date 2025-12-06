import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface SnowFlake {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
}

@Component({
  selector: 'app-christmas-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './christmas-background.component.html',
  styleUrls: ['./christmas-background.component.scss']
})
export class ChristmasBackgroundComponent {
  snowflakes: SnowFlake[] = Array.from({ length: 70 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: -Math.random() * 10,
    duration: 8 + Math.random() * 8,
    size: 6 + Math.random() * 8,
    drift: -6 + Math.random() * 12
  }));
  lights = Array.from({ length: 12 }).map((_, i) => i);
}
