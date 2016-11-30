import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { BaseRequestOptions, Http, ConnectionBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { TasksService } from './tasks.service';
import { Task } from './task';

describe('TasksService', () => {

  const TASKS: Task[] = [
    {id: 'task-1', name: 'Buy milk', done: false, userId: 'user-1'},
    {id: 'task-2', name: 'Pay rent', done: true, userId: 'user-1'}
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        }, deps: [MockBackend, BaseRequestOptions]
        },
        {provide: MockBackend, useClass: MockBackend},
        {provide: BaseRequestOptions, useClass: BaseRequestOptions},
        {provide: TasksService, useClass: TasksService}
      ]
    });
  });

  describe('getTasks()', () => {

    it('should return all tasks', inject([TasksService, MockBackend], fakeAsync((tasksService: TasksService, mockBackend: MockBackend) => {
      let result;

      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe('/tasks');
        let response = new ResponseOptions({body: TASKS});
        c.mockRespond(new Response(response));
      });

      tasksService.getTasks().then(tasks => {
        result = tasks;
      });
      tick();

      expect(result.length).toBe(TASKS.length);
    })));

  });

});
