import { Component, OnInit, Input } from '@angular/core';

import { Task } from '../task';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  @Input() task: Task;
  processing: boolean = false;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {}

  toggleTaskStatus(task: Task) {
    this.processing = true;

    task.done = !task.done;

    return this.tasksService
      .update(task)
      .then(() => this.processing = false);
  }

}
