/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TaskDetailComponent } from './task-detail.component';
import { Task } from '../task';

describe('TaskDetailComponent', () => {

  const TASK: Task = {id: 'task-1', name: 'Buy milk', done: false, userId: 'user-1'};

  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;
  let taskDetailDe: DebugElement;
  let taskDetailEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;

    // query for the list element by CSS element selector
    taskDetailDe = fixture.debugElement.query(By.css('.list-group-item'));
    taskDetailEl = taskDetailDe.nativeElement;

    component.task = TASK;

    fixture.detectChanges();
  });

  it('should display task name', () => {
    expect(taskDetailEl.textContent).toContain(TASK.name);
  });

  it('should display ok icon when task is done', () => {
    component.task.done = true;
    fixture.detectChanges();

    let isOkIconPresent = taskDetailDe.queryAll(By.css('.badge > .glyphicon-ok')).length > 0;
    expect(isOkIconPresent).toBe(true);
  });

  it('should not display ok icon when task is not done', () => {
    component.task.done = false;
    fixture.detectChanges();

    let isOkIconPresent = taskDetailDe.queryAll(By.css('.badge > .glyphicon-ok')).length > 0;
    expect(isOkIconPresent).toBe(false);
  });

});
