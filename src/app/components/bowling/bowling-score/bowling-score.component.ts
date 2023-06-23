import { Component, Input } from '@angular/core';
import BowlingScore from 'src/app/models/bowling-score';

@Component({
  selector: 'app-bowling-score',
  templateUrl: './bowling-score.component.html',
  styleUrls: ['./bowling-score.component.css']
})
export class BowlingScoreComponent {
  @Input() score: BowlingScore = {
    firstThrow: 5,
    secondThrow: 5,
    value: "/"
  }
}
