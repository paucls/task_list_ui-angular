import { TaskListUiAngular2Page } from './app.po';

describe('task-list-ui-angular2 App', function() {
  let page: TaskListUiAngular2Page;

  beforeEach(() => {
    page = new TaskListUiAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getNavbarBrand()).toEqual('Tasks List');
  });
});
