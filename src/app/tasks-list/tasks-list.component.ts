import { Component, OnInit } from '@angular/core';
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
    this.loadTasks();
  }

  addTask(name: string): Promise<void> {
    name = name.trim();
    if (!name) {
      return;
    }

    let newTask: Task = {name: name};

    return this.tasksService
      .save(newTask)
      .then(task => this.tasks.push(task));
  }

  private loadTasks() {
    this.tasksService
      .getAll()
      .then(tasks => this.tasks = tasks);
  }

}
