import { TaskListUiAngular2Page } from './app.po';

describe('Tasks List App', function () {
  let page: TaskListUiAngular2Page;

  beforeEach(() => {
    page = new TaskListUiAngular2Page();
    page.navigateTo();
  });

  describe('Navbar', () => {

    it('should display the app name', () => {
      expect(page.navbarBrand.getText()).toEqual('Tasks List');
    });

  });

  describe('Tasks list', function () {

    it('should have 2 visible tasks', function () {
      expect(page.tasks.count()).toBe(2);
      expect(page.getTask(0).getText()).toBe('Buy milk');
      expect(page.getTask(1).getText()).toBe('Pay rent');
    });

    describe('Add task', () => {

      it('should add new task to the list', () => {
        const newTask = 'Clean the house';

        page.addTask(newTask);

        expect(page.tasks.count()).toBe(3);
        expect(page.getTask(2).getText()).toBe(newTask);
      });

    });

    describe('Check task', () => {

      it('should mark task as done when undone task clicked', () => {
        page.checkTask(0);

        expect(page.isTaskDone(0)).toBe(true);
      });

      it('should mark task as undone when done task clicked', () => {
        page.checkTask(1);

        expect(page.isTaskDone(1)).toBe(false);
      });

    });

    describe('Delete task', () => {

      it('should remove the task from the list', () => {
        page.deleteTask(0);

        expect(page.tasks.count()).toBe(1);
      });

    });

  });

});
