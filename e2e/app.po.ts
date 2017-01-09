import { browser, element, by, Key } from 'protractor';

export class TaskListUiAngular2Page {

  navbarBrand = element(by.css('.navbar-brand'));
  addTaskInput = element(by.css('.task-form input'));
  tasks = element.all(by.css('app-task-detail'));

  navigateTo() {
    return browser.get('/');
  }

  getTask(index) {
    return this.tasks.get(index);
  }

  addTask(name) {
    this.addTaskInput.click();
    this.addTaskInput.sendKeys(name);
    this.addTaskInput.sendKeys(Key.ENTER);
  }

  deleteTask(index) {
    this.getTask(index).click();
    return this.getTask(index).element(by.css('.task-delete')).click();
  }

  checkTask(index) {
    return this.getTask(index).element(by.css('.task-check')).click();
  }

  isTaskDone(index) {
    return this.getTask(index)
      .element(by.css('.fa-check-square-o')).isPresent();
  }

}
