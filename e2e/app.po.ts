import { browser, element, by } from 'protractor';

export class TaskListUiAngular2Page {
  navigateTo() {
    return browser.get('/');
  }

  getNavbarBrand() {
    return element(by.css('.navbar-brand')).getText();
  }

  getTasks() {
    return element.all(by.css('app-task-detail'));
  }
}
