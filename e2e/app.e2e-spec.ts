import { PrjBasicPage } from './app.po';

describe('prj-basic App', () => {
  let page: PrjBasicPage;

  beforeEach(() => {
    page = new PrjBasicPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
