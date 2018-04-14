import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Task } from '../task';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent {

  @Input() task: Task;
  @Output() taskDeleted = new EventEmitter<Task>();
  processing = false;

  constructor(private tasksService: TasksService) {}

  deleteTask(task: Task) {
    this.tasksService
      .delete(task.id)
      .then(() => this.taskDeleted.emit(this.task));
  }

  toggleTaskStatus(task: Task) {
    this.processing = true;

    task.done = !task.done;

    return this.tasksService
      .update(task)
      .then(() => this.processing = false);
  }

}
