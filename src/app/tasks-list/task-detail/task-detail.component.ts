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

  constructor(private tasksService: TasksService) {}

  ngOnInit() {}

  toggleTaskStatus(task: Task) {
    task.done = !task.done;

    this.tasksService.updateTask(task);
  }

}
