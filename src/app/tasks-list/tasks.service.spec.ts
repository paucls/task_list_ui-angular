import {TasksService} from './tasks.service';

describe('TasksService', () => {

  let tasksService: TasksService;

  beforeEach(() => tasksService = new TasksService());

  describe('getTasks()', () => {

    it('should return all tasks', done => {
      tasksService.getTasks().then(tasks => {
        expect(tasks.length).toBe(5);
        done();
      })
    });

  });

});
