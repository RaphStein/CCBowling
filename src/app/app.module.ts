import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BowlingScoreComponent } from './components/bowling/bowling-score/bowling-score.component';
import { BowlingThrowComponent } from './components/bowling/bowling-throw/bowling-throw.component';
import { ScoreBoardComponent } from './components/bowling/score-board/score-board.component';

@NgModule({
  declarations: [
    AppComponent,
    BowlingScoreComponent,
    BowlingThrowComponent,
    ScoreBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
