import { Page } from './app.po';

describe(' App', () => {
    let page: Page;

    beforeEach(() => {
        page = new Page();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Welcome to app!');
    });
});
