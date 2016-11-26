import { TestBed, async, inject } from '@angular/core/testing';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TasksService]
    });
  });

  describe('getTasks()', () => {

    it('should return all tasks', inject([TasksService], (service: TasksService) => {
      let tasks = service.getTasks();

      expect(tasks.length).toBe(5);
    }));

  });

});
