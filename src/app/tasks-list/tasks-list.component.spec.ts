/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Http } from '@angular/http';

import { TasksListComponent } from './tasks-list.component';
import { TasksService } from './tasks.service';
import { Task } from './task';

describe('TasksListComponent', () => {

  const TASKS: Task[] = [
    {id: 'task-1', name: 'Buy milk', done: false, userId: 'user-1'},
    {id: 'task-2', name: 'Pay rent', done: true, userId: 'user-1'}
  ];

  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let tasksService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TasksListComponent],
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
    de = fixture.debugElement.query(By.css('div.list-group'));
    el = de.nativeElement;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should display the list of tasks', fakeAsync(() => {
    fixture.detectChanges();
    tick(); // wait for async getTasks
    fixture.detectChanges(); // update view with tasks

    let deItems = de.queryAll(By.css('.list-group-item'));
    expect(tasksService.getTasks).toHaveBeenCalled();
    expect(deItems.length).toBe(TASKS.length);
    expect(deItems[0].nativeElement.textContent).toContain(TASKS[0].name);
    expect(deItems[1].nativeElement.textContent).toContain(TASKS[1].name);
  }));

});
