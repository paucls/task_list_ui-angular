import { Injectable } from '@angular/core';

@Injectable()
export class TasksService {

  tasks: [any] = [
    {id: 'task-1', name: 'Buy milk', done: false, userId: 'user-1'},
    {id: 'task-2', name: 'Pay rent', done: true, userId: 'user-1'},
    {id: 'task-3', name: 'Return book', done: false, userId: 'user-1'},
    {id: 'task-4', name: 'Clean car', done: true, userId: 'user-1'},
    {id: 'task-5', name: 'Go running', done: true, userId: 'user-1'}
  ];

  constructor() { }

  getTasks(): [any] {
    return this.tasks;
  }

}
