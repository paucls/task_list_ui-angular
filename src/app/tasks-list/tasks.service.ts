import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Task } from './task';

@Injectable()
export class TasksService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private tasksUrl = '/tasks';

  constructor(private http: Http) {}

  getAll(): Observable<Task[]> {
    return this.http.get(this.tasksUrl)
      .map(response => response.json() as Task[])
      .catch(this.handleError);
  }

  delete(id: string): Promise<Response> {
    const url = `${this.tasksUrl}/${id}`;

    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  save(task: Task): Promise<Task> {
    const url = `${this.tasksUrl}`;

    return this.http.post(url, JSON.stringify(task), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Task)
      .catch(this.handleError);
  }

  update(task: Task): Promise<Response> {
    const url = `${this.tasksUrl}/${task.id}`;

    return this.http.post(url, JSON.stringify(task), {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: Response | any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
