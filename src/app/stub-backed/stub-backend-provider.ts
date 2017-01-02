import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { environment } from '../../environments/environment';
import { Task } from '../tasks-list/task';
import { logRequest, generateUuid, getUuidFromUrl } from './stub-backend-utils';

/**
 * Provider to allow the use of a stub backend instead of a real Http service for backend-less development.
 */
export let stubBackendProvider = {
  provide: Http,
  deps: [MockBackend, BaseRequestOptions, XHRBackend],
  useFactory: (mockBackend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) => {

    if (!environment.stubBackend) {
      console.log('Configuring real Http backend...');
      return new Http(realBackend, options);
    }

    console.log('Configuring stub Http backend...');

    let tasks: Task[] = [
      {id: '9509c8b4-ad34-4378-b49c-c9206dfd7f75', name: 'Buy milk', done: false, userId: 'user-1'},
      {id: '1b35d8f8-9e80-4316-b3e3-135a8f81200f', name: 'Pay rent', done: true, userId: 'user-1'}];

    mockBackend.connections.subscribe((connection: MockConnection) => {

      // wrap in timeout to simulate server api call
      setTimeout(() => {

        // Get all tasks
        if (connection.request.method === RequestMethod.Get && connection.request.url.match('/tasks$')) {
          logRequest(connection.request);

          connection.mockRespond(new Response(new ResponseOptions({body: tasks.slice()})));
          return;
        }

        // Save task
        if (connection.request.method === RequestMethod.Post && connection.request.url.match('/tasks$')) {
          logRequest(connection.request);

          let newTask = JSON.parse(connection.request.getBody());
          newTask.id = generateUuid();
          tasks.push(newTask);

          connection.mockRespond(new Response(new ResponseOptions({body: newTask})));
          return;
        }

        // Update task
        if (connection.request.method === RequestMethod.Post && connection.request.url.match('/tasks/*')) {
          logRequest(connection.request);

          let updatedTask = JSON.parse(connection.request.getBody());
          let index = tasks.findIndex(task => task.id === updatedTask.id);

          tasks[index] = updatedTask;

          connection.mockRespond(new Response(new ResponseOptions({body: updatedTask})));
          return;
        }

        // Delete task
        if (connection.request.method === RequestMethod.Delete && connection.request.url.match('/tasks/*')) {
          logRequest(connection.request);

          let id = getUuidFromUrl(connection.request.url);
          tasks = tasks.filter(task => task.id !== id);

          connection.mockRespond(new Response(new ResponseOptions()));
          return;
        }

      }, 500);

    });

    return new Http(mockBackend, options);
  }
};
