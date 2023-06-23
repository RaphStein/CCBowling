import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import BowlingScore from 'src/app/models/bowling-score';
import { BowlingService } from 'src/app/services/bowling.service';

@Component({
  selector: 'app-bowling-throw',
  templateUrl: './bowling-throw.component.html',
  styleUrls: ['./bowling-throw.component.css']
})
export class BowlingThrowComponent implements OnInit {
  pins: number[] = [];
  currentThrowNb = 0;
  currentScore: BowlingScore = {firstThrow: 0};
  finalThrow = false;
  isPlaying = true;

  @ViewChild('pins') pinsDiv!: ElementRef<HTMLDivElement>;

  constructor(private bowlingService: BowlingService) { }
  ngOnInit(): void {
    this.bowlingService.pinsSub.subscribe(value => {
      this.pins = value
    })

    this.bowlingService.currentThrowNbSub.subscribe(value => {
      this.currentThrowNb = value
    })

    this.bowlingService.currentScoreSub.subscribe(value => {
      this.currentScore = value
    })

    this.bowlingService.finalThrowSub.subscribe(value => {
      this.finalThrow = value
    })

    this.bowlingService.isPlayingSub.subscribe(value => {
      this.isPlaying = value
    })
  }

  private updatePinsDisplay() {
    const allPinsPictures = this.pinsDiv.nativeElement.querySelectorAll('img')

    allPinsPictures.forEach(pinPic => {
      if(!this.bowlingService.pins.includes(+pinPic.id.substring(4))) {
        pinPic.classList.add("pin-down")
      } else {
        pinPic.classList.remove("pin-down")
      }
    })
  }

  onThrowBall() {
    this.bowlingService.throwBall()
    this.updatePinsDisplay()
  }
}
