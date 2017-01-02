import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// used to create stub backend
import { stubBackendProvider } from './stub-backed/stub-backend-provider';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TaskDetailComponent } from './tasks-list/task-detail/task-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    TasksListComponent,
    TaskDetailComponent
  ],
  providers: [
    // used to create stub backend
    stubBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
