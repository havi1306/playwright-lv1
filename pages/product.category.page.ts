import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from './base.page';
import { Product } from '../model/product';

class ProductCategoryPage extends BasePage {
    readonly page;
    readonly products: Locator;
    readonly gridViewLink: Locator;
    readonly listViewLink: Locator;
    readonly producrtItems: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.products = page.locator('.products');
        this.gridViewLink = page.getByRole('link', { name: ' Grid' });
        this.listViewLink = page.getByRole('link', { name: ' List' });
        this.producrtItems = page.getByRole('generic').filter({ has: page.locator('.product-content-image') });
    }

    async shouldGridViewDisplayed(): Promise<void> {
        const parentDiv = this.gridViewLink.locator('..');
        await expect(this.gridViewLink).toBeVisible();
        await expect(parentDiv).toHaveClass(/switcher-active/);
    }

    async clickListView(): Promise<void> {
        await this.listViewLink.click();
    }

    async selectRandomProduct(): Promise<void> {
        const productCount = await this.producrtItems.count();
        const randomIndex = Math.floor(Math.random() * productCount);
        await this.producrtItems.nth(randomIndex).click();
    }

    async shouldListViewDisplayed(): Promise<void> {
        const parentDiv = this.listViewLink.locator('..');
        await expect(this.listViewLink).toBeVisible();
        await expect(parentDiv).toHaveClass(/switcher-active/);
    }

}
export { ProductCategoryPage };