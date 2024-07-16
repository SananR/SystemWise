import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MarkdownComponent } from "ngx-markdown";
import { ScoreCardComponent } from "../score-card/score-card.component";
import { MatIconModule } from "@angular/material/icon";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-recent-submission",
  standalone: true,
  imports: [MarkdownComponent, ScoreCardComponent, MatIconModule],
  templateUrl: "./recent-submission.component.html",
  styleUrl: "./recent-submission.component.scss",
})
export class RecentSubmissionComponent {
  @Output() backArrowClick: EventEmitter<any> = new EventEmitter();

  handleBackArrowClick() {
    this.backArrowClick.emit();
  }

  feedback: string = "";
  score: number = 0;

  setSubmissionData(feedback: string, score: number) {
    this.feedback = feedback;
    this.score = score;
  }
}
