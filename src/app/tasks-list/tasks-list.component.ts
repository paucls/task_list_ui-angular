import { Component, OnInit } from '@angular/core';
import { TasksClient } from './tasks.client';
import { Task } from './task';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
  providers: [TasksClient]
})
export class TasksListComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private tasksClient: TasksClient) {
  }

  ngOnInit() {
    this.tasksClient
      .getAll()
      .then(tasks => this.tasks = tasks);
  }

  addTask(name: string): Promise<number> {
    name = name.trim();
    if (!name) {
      return;
    }

    let newTask: Task = {name: name};

    return this.tasksClient
      .save(newTask)
      .then(task => this.tasks.push(task));
  }

  deleteTask(deletedTask: Task) {
    this.tasks = this.tasks.filter(task => task.id !== deletedTask.id);
  }

}
