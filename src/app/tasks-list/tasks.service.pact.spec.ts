import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import * as Pact from 'pact-web';

import { TasksService } from './tasks.service';
import { Task } from './task';

describe('TasksService', () => {

  let provider;
  let tasksService;

  beforeAll((done) => {
    provider = Pact({
      consumer: 'titan-ui2-sample-app',
      provider: 'titan-release-toggling',
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
      providers: [TasksService],
      imports: [HttpModule]
    });

    tasksService = getTestBed().get(TasksService);
  });

  afterEach((done) => {
    provider.verify().then(done, e => done.fail(e));
  });

  describe('delete()', () => {

    beforeAll((done) => {
      provider.addInteraction({
        given: 'a task with task-id exists',
        uponReceiving: 'a request to delete task with task-id',
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
      tasksService.delete('task-id').then(done);
    });

  });

  describe('getAll()', () => {

    beforeAll((done) => {
      provider.addInteraction({
        given: 'tasks exists',
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

      tasksService.getAll().then(tasks => {
        expect(tasks).toEqual(tasks);
        done()
      });

    });

  });

});
