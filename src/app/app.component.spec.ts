/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { Http } from '@angular/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavbarComponent,
        TasksListComponent
      ],
      providers: [
        { provide: Http, useClass: class HttpStub{} }
      ]
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
