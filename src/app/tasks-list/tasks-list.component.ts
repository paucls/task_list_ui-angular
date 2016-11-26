import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  tasks: [any] = [
    {id: 'task-1', name: 'Buy milk', done: false, userId: 'user-1'},
    {id: 'task-2', name: 'Pay rent', done: true, userId: 'user-1'},
    {id: 'task-3', name: 'Return book', done: false, userId: 'user-1'},
    {id: 'task-4', name: 'Clean car', done: true, userId: 'user-1'},
    {id: 'task-5', name: 'Go running', done: true, userId: 'user-1'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
