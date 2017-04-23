import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { BaseRequestOptions, Http, ConnectionBackend, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { TasksService } from './tasks.service';
import { Task } from './task';

describe('TasksService', () => {

  const TASK_1: Task = {id: 'task-1', name: 'Buy milk', done: false, userId: 'user-1'};
  const TASK_2: Task = {id: 'task-2', name: 'Pay rent', done: true, userId: 'user-1'};
  const TASKS: Task[] = [TASK_1, TASK_2];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        },
        {provide: MockBackend, useClass: MockBackend},
        {provide: BaseRequestOptions, useClass: BaseRequestOptions},
        {provide: TasksService, useClass: TasksService}
      ]
    });
  });

  describe('delete()', () => {

    it('should call the API to delete the task', inject([TasksService, MockBackend], fakeAsync((tasksService: TasksService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(connection => {
        expect(connection.request.method).toBe(RequestMethod.Delete);
        expect(connection.request.url).toBe(`/tasks/${TASK_1.id}`);
        connection.mockRespond(new Response(new ResponseOptions()));
      });

      tasksService.delete(TASK_1.id);
    })));

  });

  describe('getAll()', () => {

    it('should return all tasks from API', inject([TasksService, MockBackend], fakeAsync((tasksService: TasksService, mockBackend: MockBackend) => {
      let result;

      mockBackend.connections.subscribe(connection => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.url).toBe('/tasks');
        let options = new ResponseOptions({body: TASKS});
        connection.mockRespond(new Response(options));
      });

      tasksService.getAll().subscribe(tasks => {
        result = tasks;
      });
      tick();

      expect(result.length).toBe(TASKS.length);
    })));

  });

  describe('save()', () => {

    it('should call the API to save the new task', inject([TasksService, MockBackend], fakeAsync((tasksService: TasksService, mockBackend: MockBackend) => {
      let result;
      let newTask = {name: 'Buy milk'};

      mockBackend.connections.subscribe(connection => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        expect(connection.request.url).toBe(`/tasks`);
        let options = new ResponseOptions({body: TASK_1});
        connection.mockRespond(new Response(options));
      });

      tasksService.save(newTask).then(task => {
        result = task;
      });
      tick();

      expect(result).toBe(TASK_1);
    })));

  });

  describe('update()', () => {

    it('should call the API to update the task', inject([TasksService, MockBackend], fakeAsync((tasksService: TasksService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe(connection => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        expect(connection.request.url).toBe(`/tasks/${TASK_1.id}`);
        connection.mockRespond(new Response(new ResponseOptions()));
      });

      tasksService.update(TASK_1);
    })));

  });

});
