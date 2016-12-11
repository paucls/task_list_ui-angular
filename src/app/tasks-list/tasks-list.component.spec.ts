/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Http } from '@angular/http';

import { TasksListComponent } from './tasks-list.component';
import { TasksService } from './tasks.service';
import { Task } from './task';
import { TaskDetailComponent } from './task-detail/task-detail.component';

describe('TasksListComponent', () => {

  const TASK_1: Task = {id: 'task-1', name: 'Buy milk', done: false, userId: 'user-1'};
  const TASK_2: Task = {id: 'task-2', name: 'Pay rent', done: true, userId: 'user-1'};
  const TASKS: Task[] = [TASK_1, TASK_2];

  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;
  let taskListDe: DebugElement;
  let taskListEl: HTMLElement;
  let tasksService: TasksService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TasksListComponent,
        TaskDetailComponent
      ],
      providers: [
        TasksService,
        {provide: Http, useClass: class HttpStub {}}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;

    // TasksService from the root injector
    tasksService = fixture.debugElement.injector.get(TasksService);

    // Setup spy on the `getAll` method
    spyOn(tasksService, 'getAll').and.returnValue(Promise.resolve(TASKS));

    // query for the list-group by CSS element selector
    taskListDe = fixture.debugElement.query(By.css('div.list-group'));
    taskListEl = taskListDe.nativeElement;
  });

  it('should display the list of tasks', fakeAsync(() => {
    fixture.detectChanges();
    tick(); // wait for async getAll
    fixture.detectChanges(); // update view with tasks

    let taskDetailDe = taskListDe.queryAll(By.css('app-task-detail'));
    expect(tasksService.getAll).toHaveBeenCalled();
    expect(taskDetailDe.length).toBe(TASKS.length);
    expect(taskDetailDe[0].nativeElement.textContent).toContain(TASKS[0].name);
    expect(taskDetailDe[1].nativeElement.textContent).toContain(TASKS[1].name);
  }));

  describe('addTask()', () => {

    let taskName = 'Task Name';

    it('should call service to save the new task', () => {
      spyOn(tasksService, 'save').and.returnValue(Promise.resolve());

      component.addTask(taskName);

      expect(tasksService.save).toHaveBeenCalledWith({name: taskName});
    });

    it('should add created task to the list of tasks', fakeAsync(() => {
      spyOn(tasksService, 'save').and.returnValue(Promise.resolve(TASK_1));

      component.addTask(taskName);
      tick();

      expect(component.tasks.length).toBe(1);
      expect(component.tasks[0]).toBe(TASK_1);
    }));

  });

});
