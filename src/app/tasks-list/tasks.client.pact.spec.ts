import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import * as Pact from 'pact-web';

import { TasksClient } from './tasks.client';
import { Task } from './task';

describe('TasksClient', () => {

  let provider;
  let tasksClient: TasksClient;

  beforeAll((done) => {
    provider = Pact({
      consumer: 'task-list-ui',
      provider: 'task-list-api',
      web: true
    });

    // required for slower CI environments
    setTimeout(done, 200);

    // Required if run with `singleRun: false`
    provider.removeInteractions();
  });

  afterAll((done) => {
    provider.finalize().then(done, e => done.fail(e));
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TasksClient],
      imports: [HttpModule]
    });

    tasksClient = getTestBed().get(TasksClient);
  });

  afterEach((done) => {
    provider.verify().then(done, e => done.fail(e));
  });

  describe('Save Task', () => {

    const unsavedTaskBody = {
      name: Pact.Matchers.somethingLike('a name'),
      done: Pact.Matchers.somethingLike(false),
      userId: Pact.Matchers.somethingLike('an user id')
    };
    const savedTaskBody = {...unsavedTaskBody, id: Pact.Matchers.somethingLike('task-id')};

    beforeAll((done) => {
      provider.addInteraction({
        state: 'a task with id task-id does not exist',
        uponReceiving: 'a request to create task task-id',
        withRequest: {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          path: '/tasks',
          body: unsavedTaskBody
        },
        willRespondWith: {
          status: 201,
          body: savedTaskBody
        }
      }).then(done, e => done.fail(e));
    });

    it('should return saved task from API', (done) => {
      const task = {
        name: 'a name',
        done: false,
        userId: 'an user id'
      };

      tasksClient.save(task).then(response => {
        expect(response).toEqual({...task, id: 'task-id'});
        done();
      });
    });

  });

  describe('Delete Task', () => {

    beforeAll((done) => {
      provider.addInteraction({
        state: 'a task with id task-id exists',
        uponReceiving: 'a request to delete task task-id',
        withRequest: {
          method: 'DELETE',
          path: '/tasks/task-id'
        },
        willRespondWith: {
          status: 204
        }
      }).then(done, e => done.fail(e));
    });

    it('should call the API to delete the task', (done) => {
      tasksClient.delete('task-id').then(done);
    });

  });

  describe('Get all Tasks', () => {

    beforeAll((done) => {
      provider.addInteraction({
        state: 'tasks exists',
        uponReceiving: 'a request to get tasks',
        withRequest: {
          method: 'GET',
          path: '/tasks'
        },
        willRespondWith: {
          status: 200,
          headers: {'Content-Type': 'application/json'},
          body: [{
            id: Pact.Matchers.somethingLike('an id'),
            name: Pact.Matchers.somethingLike('a name'),
            done: Pact.Matchers.somethingLike(false),
            userId: Pact.Matchers.somethingLike('an user id')
          }]
        }
      }).then(done, e => done.fail(e));
    });

    it('should return all tasks from API', (done) => {
      const tasks: Task[] = [{
        id: 'an id',
        name: 'a name',
        done: false,
        userId: 'an user id'
      }];

      tasksClient.getAll().then(response => {
        expect(response).toEqual(tasks);
        done();
      });
    });

  });

});
