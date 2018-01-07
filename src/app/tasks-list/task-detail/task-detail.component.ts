import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Task } from '../task';
import { TasksClient } from '../tasks.client';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent {

  @Input() task: Task;
  @Output() taskDeleted = new EventEmitter<Task>();
  processing: boolean = false;

  constructor(private tasksClient: TasksClient) {}

  deleteTask(task: Task) {
    this.tasksClient
      .delete(task.id)
      .then(() => this.taskDeleted.emit(this.task));
  }

  toggleTaskStatus(task: Task) {
    this.processing = true;

    task.done = !task.done;

    return this.tasksClient
      .update(task)
      .then(() => this.processing = false);
  }

}
