import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Task } from './task';

@Injectable()
export class TasksService {

  private tasksUrl = '/tasks';

  constructor(private http: Http) {}

  getTasks(): Promise<Task[]> {
    return this.http.get(this.tasksUrl)
      .toPromise()
      .then(response => response.json() as Task[]);
  }

  updateTask(task: Task): Promise<Task> {
    const url = `${this.tasksUrl}/${task.id}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(url, JSON.stringify(task), options)
      .toPromise();
  }

}
