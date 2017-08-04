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

    // required for slower Travis CI environment
    setTimeout(function () { done() }, jasmine.DEFAULT_TIMEOUT_INTERVAL - 1000); // needs to be less than jasmine timeout

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

  describe('getAll()', () => {

    it('should return all tasks from API', (done) => {

      const TASKS: Task[] = [{
        id: 'an id',
        name: 'a name',
        done: false,
        userId: 'an user id'
      }];

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
      });

      tasksService.getAll().then(tasks => {
        expect(tasks).toEqual(TASKS);
        done()
      });

    });

  });

});
