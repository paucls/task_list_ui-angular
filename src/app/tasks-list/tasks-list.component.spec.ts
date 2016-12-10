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

  const TASKS: Task[] = [
    {id: 'task-1', name: 'Buy milk', done: false, userId: 'user-1'},
    {id: 'task-2', name: 'Pay rent', done: true, userId: 'user-1'}
  ];

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

    // Setup spy on the `getTasks` method
    spyOn(tasksService, 'getTasks').and.returnValue(Promise.resolve(TASKS));

    // query for the list-group by CSS element selector
    taskListDe = fixture.debugElement.query(By.css('div.list-group'));
    taskListEl = taskListDe.nativeElement;
  });

  it('should display the list of tasks', fakeAsync(() => {
    fixture.detectChanges();
    tick(); // wait for async getTasks
    fixture.detectChanges(); // update view with tasks

    let taskDetailDe = taskListDe.queryAll(By.css('app-task-detail'));
    expect(tasksService.getTasks).toHaveBeenCalled();
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

    it('should reload list of tasks', fakeAsync(() => {
      spyOn(tasksService, 'save').and.returnValue(Promise.resolve());

      component.addTask(taskName);

      tick();
      expect(tasksService.getTasks).toHaveBeenCalled();
    }));

  });

});
