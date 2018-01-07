/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Http } from '@angular/http';

import { TasksListComponent } from './tasks-list.component';
import { TasksClient } from './tasks.client';
import { Task } from './task';
import { TaskDetailComponent } from './task-detail/task-detail.component';

describe('TasksListComponent', () => {

  const TASK_1: Task = {id: 'task-1', name: 'Buy milk', done: false, userId: 'user-1'};
  const TASK_2: Task = {id: 'task-2', name: 'Pay rent', done: true, userId: 'user-1'};

  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;
  let taskListDe: DebugElement;
  let taskListEl: HTMLElement;
  let tasksClient: TasksClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TasksListComponent,
        TaskDetailComponent
      ],
      providers: [
        TasksClient,
        {provide: Http, useClass: class HttpStub {}}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;

    // TasksService from the root injector
    tasksClient = fixture.debugElement.injector.get(TasksClient);

    // Setup spy on the `getAll` method
    spyOn(tasksClient, 'getAll').and.returnValue(Promise.resolve([TASK_1, TASK_2]));

    // query for the list-group by CSS element selector
    taskListDe = fixture.debugElement.query(By.css('div.list-group'));
    taskListEl = taskListDe.nativeElement;
  });

  it('should display the list of tasks', fakeAsync(() => {
    fixture.detectChanges();
    tick(); // wait for async getAll
    fixture.detectChanges(); // update view with tasks

    let taskDetailDe = taskListDe.queryAll(By.css('app-task-detail'));
    expect(tasksClient.getAll).toHaveBeenCalled();
    expect(taskDetailDe.length).toBe(2);
    expect(taskDetailDe[0].nativeElement.textContent).toContain(TASK_1.name);
    expect(taskDetailDe[1].nativeElement.textContent).toContain(TASK_2.name);
  }));

  describe('addTask()', () => {

    let taskName = 'Task Name';

    it('should call service to save the new task', () => {
      spyOn(tasksClient, 'save').and.returnValue(Promise.resolve());

      component.addTask(taskName);

      expect(tasksClient.save).toHaveBeenCalledWith({name: taskName});
    });

    it('should add created task to the list of tasks', fakeAsync(() => {
      spyOn(tasksClient, 'save').and.returnValue(Promise.resolve(TASK_1));

      component.addTask(taskName);
      tick();

      expect(component.tasks.length).toBe(1);
      expect(component.tasks[0]).toBe(TASK_1);
    }));

    it('should do nothing if task name is blank', () => {
      spyOn(tasksClient, 'save');

      component.addTask(' ');

      expect(tasksClient.save).not.toHaveBeenCalled();
    });

  });

  describe('deleteTask()', () => {

    it('should remove deleted task from tasks list', () => {
      component.tasks = [TASK_1, TASK_2];

      component.deleteTask(TASK_1);

      expect(component.tasks.length).toBe(1);
    });

  });

});
