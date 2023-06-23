import { Component, OnInit } from '@angular/core';
import BowlingScore from 'src/app/models/bowling-score';
import { BowlingService } from 'src/app/services/bowling.service';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent implements OnInit {
  scores: BowlingScore[] = []
  newGameAvailable = false
  totalScore = 0

  constructor(private bowlingService: BowlingService) { }
  
  ngOnInit(): void {
    this.bowlingService.scoresSub.subscribe(value => {
        this.scores = value
    })

    this.bowlingService.newGameAvailableSub.subscribe(value => {
      this.newGameAvailable = value
    })

    this.bowlingService.totalScoreSub.subscribe(value => {
      this.totalScore = value
    })
  }

  onStartNewGame() {
    this.bowlingService.startNewGame()
  }
}
