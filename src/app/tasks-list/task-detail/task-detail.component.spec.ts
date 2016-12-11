import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Http } from '@angular/http';

import { TaskDetailComponent } from './task-detail.component';
import { Task } from '../task';
import { TasksService } from '../tasks.service';

describe('TaskDetailComponent', () => {

  const TASK: Task = {id: 'task-1', name: 'Buy milk', done: false, userId: 'user-1'};

  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;
  let taskDetailDe: DebugElement;
  let taskDetailEl: HTMLElement;
  let tasksService: TasksService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskDetailComponent],
      providers: [
        TasksService,
        {provide: Http, useClass: class HttpStub {}}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;

    // TasksService from the root injector
    tasksService = fixture.debugElement.injector.get(TasksService);

    // query for the list element by CSS element selector
    taskDetailDe = fixture.debugElement.query(By.css('.list-group-item'));
    taskDetailEl = taskDetailDe.nativeElement;

    component.task = TASK;

    fixture.detectChanges();
  });

  it('should display task name', () => {
    expect(taskDetailEl.textContent).toContain(TASK.name);
  });

  it('should display check icon when task is done', () => {
    component.task.done = true;
    fixture.detectChanges();

    let isCheckIconPresent = taskDetailDe.queryAll(By.css('.task-check > .fa-check-square-o')).length > 0;
    expect(isCheckIconPresent).toBe(true);
  });

  it('should not display check icon when task is not done', () => {
    component.task.done = false;
    fixture.detectChanges();

    let isOkIconPresent = taskDetailDe.queryAll(By.css('.task-check > .fa-check-square-o')).length > 0;
    expect(isOkIconPresent).toBe(false);
  });

  it('should display unchecked icon when task is not done', () => {
    component.task.done = false;
    fixture.detectChanges();

    let isUncheckedIconPresent = taskDetailDe.queryAll(By.css('.task-check > .fa-square-o')).length > 0;
    expect(isUncheckedIconPresent).toBe(true);
  });

  it('should not display unchecked icon when task is done', () => {
    component.task.done = true;
    fixture.detectChanges();

    let isUncheckedIconPresent = taskDetailDe.queryAll(By.css('.task-check > .fa-square-o')).length > 0;
    expect(isUncheckedIconPresent).toBe(false);
  });

  describe('toggleTaskStatus()', () => {

    beforeEach(() => {
      spyOn(tasksService, 'update').and.returnValue(Promise.resolve());
    });

    it('should set an undone task as done', () => {
      let task: Task = {name: 'Undone task', done: false};

      component.toggleTaskStatus(task);

      expect(task.done).toBe(true);
    });

    it('should set a done task as undone', () => {
      let task: Task = {name: 'Done task', done: true};

      component.toggleTaskStatus(task);

      expect(task.done).toBe(false);
    });

    it('should call the service to update task', () => {
      let task: Task = {name: 'Task', done: false};
      let expectedToggledTask: Task = {name: 'Task', done: true};

      component.toggleTaskStatus(task);

      expect(tasksService.update).toHaveBeenCalledWith(expectedToggledTask);
    });

    it('should indicate when operation is processing', () => {
      let task: Task = {name: 'Undone task', done: false};

      expect(component.processing).toBe(false);

      component.toggleTaskStatus(task);

      expect(component.processing).toBe(true);
    });

  });

});
