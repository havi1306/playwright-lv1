import { Locator, Page } from '@playwright/test'

class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string): Promise<void> {
        this.page.goto(url);
    }
}
export { BasePage }