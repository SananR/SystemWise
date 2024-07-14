import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-submission-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./submission-list.component.html",
  styleUrl: "./submission-list.component.scss",
})
export class SubmissionListComponent {
  submissions: any[] = [
    {
      timeSubmitted: "07/13/2024 18:19",
      status: "Accepted",
      runtime: "3420 ms",
      memory: "17.4 MB",
      language: "python3",
    },
    {
      timeSubmitted: "07/13/2024 17:14",
      status: "Accepted",
      runtime: "3410 ms",
      memory: "17.3 MB",
      language: "python3",
    },
    {
      timeSubmitted: "07/13/2024 17:14",
      status: "Wrong Answer",
      runtime: "N/A",
      memory: "N/A",
      language: "python3",
    },
    {
      timeSubmitted: "07/13/2024 17:12",
      status: "Wrong Answer",
      runtime: "N/A",
      memory: "N/A",
      language: "python3",
    },
    {
      timeSubmitted: "07/13/2024 17:12",
      status: "Wrong Answer",
      runtime: "N/A",
      memory: "N/A",
      language: "python3",
    },
    {
      timeSubmitted: "06/05/2024 22:39",
      status: "Accepted",
      runtime: "64 ms",
      memory: "17.8 MB",
      language: "python3",
    },
    {
      timeSubmitted: "05/01/2024 08:59",
      status: "Accepted",
      runtime: "61 ms",
      memory: "17.8 MB",
      language: "python3",
    },
    {
      timeSubmitted: "11/07/2023 17:40",
      status: "Accepted",
      runtime: "61 ms",
      memory: "17.6 MB",
      language: "python3",
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
