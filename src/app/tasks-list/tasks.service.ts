import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TasksService {

  private tasksUrl = 'http://paucls-task-list-api.herokuapp.com/tasks';

  constructor(private http: Http) {
  }

  getTasks(): Promise<any[]> {
    return this.http.get(this.tasksUrl)
      .toPromise()
      .then(response => response.json() as any[]);
  }
}
