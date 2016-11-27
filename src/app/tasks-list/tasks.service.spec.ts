import {TasksService} from './tasks.service';
import {Http} from '@angular/http';

describe('TasksService', () => {

  let httpFake = {};
  let tasksService: TasksService;

  beforeEach(() => {
    tasksService = new TasksService(httpFake as Http);
  });

  describe('getTasks()', () => {

    // it('should return all tasks', done => {
    //   tasksService.getTasks().then(tasks => {
    //     expect(tasks.length).toBe(5);
    //     done();
    //   });
    // });

  });

});
