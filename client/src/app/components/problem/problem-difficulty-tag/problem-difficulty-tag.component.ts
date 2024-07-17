import { Component, Input } from "@angular/core";
import { NgClass } from "@angular/common";

export enum ProblemDifficulty {
  EASY = "Easy",
  MEDIUM = "Medium",
  ADVANCED = "Advanced",
}

@Component({
  selector: "app-problem-difficulty-tag",
  standalone: true,
  imports: [NgClass],
  templateUrl: "./problem-difficulty-tag.component.html",
  styleUrl: "./problem-difficulty-tag.component.scss",
})
export class ProblemDifficultyTagComponent {
  ProblemDifficulty = ProblemDifficulty;

  @Input({ required: true })
  difficulty: ProblemDifficulty = ProblemDifficulty.EASY;
}
