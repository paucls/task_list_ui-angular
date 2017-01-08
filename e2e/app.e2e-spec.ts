import { TaskListUiAngular2Page } from './app.po';

describe('Tasks List App', function () {
  let page: TaskListUiAngular2Page;

  beforeEach(() => {
    page = new TaskListUiAngular2Page();
    page.navigateTo();
  });

  describe('Navbar', () => {

    it('should display the app name', () => {
      expect(page.getNavbarBrand()).toEqual('Tasks List');
    });

  });

  describe('Tasks list', function () {

    it('should have 2 visible tasks', function () {
      expect(page.getTasks().count()).toBe(2);
    });

  });

});
