import { Injectable } from '@angular/core';
import BowlingScore from '../models/bowling-score';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BowlingService {
  currentThrowNb = 0
  currentThrowNbSub = new Subject<number>()
  pins = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  pinsSub = new Subject<number[]>()
  currentScore: BowlingScore = {firstThrow: 0}
  currentScoreSub = new Subject<BowlingScore>()
  scores: BowlingScore[] = []
  scoresSub = new Subject<BowlingScore[]>()
  finalThrow = false
  finalThrowSub = new Subject<boolean>()
  isPlaying = true
  isPlayingSub = new Subject<boolean>()
  newGameAvailable = false;
  newGameAvailableSub = new Subject<boolean>()
  totalScore = 0
  totalScoreSub = new Subject<number>()

  constructor() { 
    // do nothing
  }

  private calcTotalScore() {
    this.totalScore = 0
    for (let i = 0; i < this.scores.length; i++) {
      if (i != 9) {
        if (this.scores[i].isSpecial == 2) {
          this.calculeScoreStrike(i);
        } else if (this.scores[i].isSpecial == 1) {
          this.calculScoreSpaire(i);
        } else {
          this.calculeScore(i);
        }
      } else {
        this.calculeScoreDixiemeFrame(i);
      }
    }

    this.totalScoreSub.next(this.totalScore)
  }

  startNewGame() {
    this.scores = []
    this.scoresSub.next(this.scores)
    this.isPlaying = true
    this.isPlayingSub.next(this.isPlaying)
    this.finalThrow = false
    this.finalThrowSub.next(this.finalThrow)
    this.currentScore = {firstThrow: 0}
    this.currentScoreSub.next(this.currentScore)
  }

  throwBall() {   
    if (this.currentThrowNb) {
       
      const rngRoll = this.genereEntierAleatoire(this.pins.length);
      this.pins.splice(this.pins.length - rngRoll);
      

      if (this.currentThrowNb == 3) {
        this.traiteTroisiemeLance(rngRoll)
      } else if (this.currentThrowNb == 2) {
        this.traiteDeuxiemeLance(rngRoll);
      } else {
        this.traitePremierLance(rngRoll);
      }
    } else {
      this.currentScore = {firstThrow: 0}
      this.pins = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      this.currentThrowNb = 1
    }

    this.pinsSub.next(this.pins)
    this.currentScoreSub.next(this.currentScore)
    this.currentThrowNbSub.next(this.currentThrowNb)
    this.scoresSub.next(this.scores)

    this.calcTotalScore()

    if(this.scores.length == 9) {
      this.finalThrow = true
    } else if(this.scores.length == 10) {
      this.isPlaying = false
      this.newGameAvailable = true
    }

    this.finalThrowSub.next(this.finalThrow)
    this.isPlayingSub.next(this.isPlaying)
    this.newGameAvailableSub.next(this.newGameAvailable)
  }

  private traitePremierLance(rngRoll: number){
    this.currentScore.firstThrow = rngRoll
    if (rngRoll == 10) {
      this.currentScore.isSpecial = 2;
      if (!this.finalThrow) {
        this.scores = [...this.scores, this.currentScore]
        this.currentThrowNb = 0
      } else {
        this.currentScore = {firstThrow: 0}
        this.pins = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        this.currentThrowNb = 3
      }
    } else {
      this.currentThrowNb = 2
    }
  } 
  private traiteDeuxiemeLance(rngRoll: number){
    this.currentScore = {...this.currentScore, secondThrow: rngRoll}
    const secondThrow = this.currentScore.secondThrow || 0;
    if (this.currentScore.firstThrow +  secondThrow == 10) {
      this.currentScore.isSpecial = 1
    }
    if (!this.finalThrow) {
      this.scores = [...this.scores, this.currentScore]
      this.currentThrowNb = 0
    } else {
      if (this.currentScore.isSpecial) {
        this.pins = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        this.currentThrowNb = 3 
      } else {
        this.scores = [...this.scores, this.currentScore]
        this.currentThrowNb = 0
      }
    }
  }
  private traiteTroisiemeLance(rngRoll: number){
    this.currentScore = {...this.currentScore, thirdThrow: rngRoll}
    this.scores = [...this.scores, this.currentScore]
    this.currentThrowNb = 0
  }

  private calculeScoreStrike(i: number){
    if (this.scores[i + 1]?.isSpecial == 2) {
      const score = this.scores[i].firstThrow + (this.scores[i + 1]?.firstThrow || 0) + (this.scores[i + 1]?.thirdThrow || 0) + (this.scores[i + 2]?.firstThrow || 0)
      this.totalScore += score
      this.scores[i].value = (this.scores[i + 1] && this.scores[i + 2]) || i + 1 == 9 ? score.toString() : "X"
    } else {
      const score = this.scores[i].firstThrow + (this.scores[i + 1]?.firstThrow || 0) + (this.scores[i + 1]?.secondThrow || 0)
      this.totalScore += score
      this.scores[i].value = (this.scores[i + 1] && this.scores[i + 2]) || i + 1 == 9 ? score.toString() : "X"
    }
  }

  private calculScoreSpaire(i: number){
    const score = this.scores[i].firstThrow + (this.scores[i].secondThrow || 0) + (this.scores[i + 1]?.firstThrow || 0)
    this.totalScore += score
    this.scores[i].value = score.toString()
  }

  private calculeScore(i: number){
    const score = this.scores[i].firstThrow + (this.scores[i].secondThrow || 0)
    this.totalScore += score
    this.scores[i].value = (score).toString()
  }

  private calculeScoreDixiemeFrame(i: number){
    if (this.scores[i].isSpecial) {
      const score = this.scores[i].firstThrow + (this.scores[i]?.secondThrow || 0) + (this.scores[i]?.thirdThrow || 0) * 2
      this.totalScore += score
      this.scores[i].value = score.toString()
    } else {
      const score = this.scores[i].firstThrow + (this.scores[i].secondThrow || 0)
      this.totalScore += score
      this.scores[i].value = (score).toString()
    }
  }

  private genereEntierAleatoire (nombreMax: number){
    const byteArray = new Uint8Array(1);
    window.crypto.getRandomValues(byteArray);
    const nombres = byteArray[0]/(Math.pow(2,8)-1);
    return Math.floor(nombres * (nombreMax+1));
  }
  
}
