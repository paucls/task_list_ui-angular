import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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
}
