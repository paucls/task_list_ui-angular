import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TasksService } from './tasks.service';
import { Task } from './task';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
  providers: [TasksService]
})
export class TasksListComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private tasksService: TasksService) {
  }

  ngOnInit() {
    this.tasksService
      .getAll()
      .subscribe(tasks => this.tasks = tasks);
  }

  addTask(name: string): Observable<number> {
    name = name.trim();
    if (!name) {
      return;
    }

    let newTask: Task = {name: name};

    return this.tasksService
      .save(newTask)
      .subscribe(task => this.tasks.push(task));
  }

  deleteTask(deletedTask: Task) {
    this.tasks = this.tasks.filter(task => task.id !== deletedTask.id);
  }

}
