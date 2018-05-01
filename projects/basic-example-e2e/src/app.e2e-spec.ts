import {AppPage} from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display "Example Form"', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Example Form');
  });
});
