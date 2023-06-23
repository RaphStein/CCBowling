import { TestBed } from '@angular/core/testing';

import { BowlingService } from './bowling.service';

describe('BowlingService', () => {
  let service: BowlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BowlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  describe('calcTotalScore', () => {
    it('should add 1 to the total score', () => {

      service.startNewGame();

      service.scores.push({ firstThrow: 1 })
      service['calcTotalScore']();
      expect(service.totalScore).toEqual(1);

    });
    it('should add 3 to the total score (1 for the first throw and 2 for the second)', () => {

      service.startNewGame();

      service.scores.push({ firstThrow: 1, secondThrow: 2 })
      service['calcTotalScore']();
      expect(service.totalScore).toEqual(3);

    });
    it('should call calculeScoreStrike', () => {
      const privateSpy = spyOn<any>(service, 'calculeScoreStrike');
      service.startNewGame();

      service.scores.push({ firstThrow: 10, isSpecial: 2 })
      service['calcTotalScore']();
      expect(privateSpy).toHaveBeenCalled();

    });
    it('should call calculeScoreSpair', () => {
      const privateSpy = spyOn<any>(service, 'calculScoreSpaire');
      service.startNewGame();

      service.scores.push({ firstThrow: 10, isSpecial: 1 })
      service['calcTotalScore']();
      expect(privateSpy).toHaveBeenCalled();

    });
    it('should call calculeScoreDixiemeFrame', () => {
      const privateSpy = spyOn<any>(service, 'calculeScoreDixiemeFrame');
      service.startNewGame();
      for(let i=0; i < 10; i++ ){
        service.scores.push({ firstThrow: 2, secondThrow: 3 })  
      }
    
      service['calcTotalScore']();
      expect(privateSpy).toHaveBeenCalled();

    });

  });
  describe('throwBall', () => {
    it('should start a new game', () => {
      service.startNewGame();
      service.throwBall();
      expect(service.currentThrowNb).toEqual(1);

    });
    it('should throw a ball', () => {
      const privateSpy = spyOn<any>(service, 'genereEntierAleatoire');
      service.startNewGame();
      service.throwBall();
      service.throwBall();
      expect(privateSpy).toHaveBeenCalled();

    });
    it('should throw a ball and score 5', () => {
      spyOn<any>(service, 'genereEntierAleatoire').and.returnValue(5);
      service.startNewGame();
      service.throwBall();
      service.throwBall();
      service.totalScoreSub.subscribe((value) => {
        expect(value).toEqual(5)
      })
    });
    it('should throw 2 balls and score 10', () => {
      spyOn<any>(service, 'genereEntierAleatoire').and.returnValue(5);
      service.startNewGame();
      service.throwBall();
      service.throwBall();
      service.throwBall();      
      service.totalScoreSub.subscribe((value) => {
        expect(value).toEqual(10)
      })
    });

  });
  describe('traitePremierLance', () => {
    it('should let a second ball to be thrown', () => {
      service.startNewGame();
      service['traitePremierLance'](5)
      expect(service.currentThrowNb).toEqual(2);

    });
    it('should let a second ball to be thrown', () => {
      //service.startNewGame();
      service['traitePremierLance'](5)
      expect(service.currentThrowNb).toEqual(2);

    });
    it('should let a be a strike', () => {
      //service.startNewGame();
      
      service['traitePremierLance'](10)
      expect(service.currentScore.isSpecial).toEqual(2);

    });
  });
});
