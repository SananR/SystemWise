import { Component, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIcon, MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-score-card",
  standalone: true,
  imports: [MatCardModule, MatProgressSpinnerModule, MatIconModule],
  templateUrl: "./score-card.component.html",
  styleUrl: "./score-card.component.scss",
})
export class ScoreCardComponent {
  @Input() score: string | undefined;

  scoreAggregated: number = 5;
  ngOnInit() {
    if (this.score) {
      this.scoreAggregated = +this.score * 10;
    }
  }
}
