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
    this.tasksService
      .getAll()
      .then(tasks => this.tasks = tasks);
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

  deleteTask(deletedTask: Task) {
    this.tasks = this.tasks.filter(task => task.id !== deletedTask.id);
  }

}
