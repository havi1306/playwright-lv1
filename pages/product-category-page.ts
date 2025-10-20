import { Locator, Page } from '@playwright/test'

class ProductCategoryPage {
    readonly page;
    readonly products: Locator;


    constructor(page: Page) {
        this.page = page;
        this.products = page.locator('.products');
    }
}