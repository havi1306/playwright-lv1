import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from './base.page';
import { getRandomIndex } from '../utils/utils';

class ProductCategoryPage extends BasePage {
    readonly products: Locator;
    readonly gridViewLink: Locator;
    readonly listViewLink: Locator;
    readonly productItems: Locator;

    constructor(page: Page) {
        super(page);
        this.products = page.locator('.products');
        this.gridViewLink = page.getByRole('link', { name: ' Grid' });
        this.listViewLink = page.getByRole('link', { name: ' List' });
        this.productItems = page.getByRole('heading', { level: 2 });
    }

    async shouldGridViewDisplayed(): Promise<void> {
        const parentDiv = this.gridViewLink.locator('..');
        await expect.soft(parentDiv).toHaveClass(/switcher-active/);
    }

    async clickListView(): Promise<void> {
        const parentDiv = this.listViewLink.locator('..');
        await parentDiv.click();
    }

    async selectRandomProduct(): Promise<void> {
        const productCount = await this.productItems.count();
        await this.productItems.nth(await getRandomIndex(productCount)).click();
    }

    async shouldListViewDisplayed(): Promise<void> {
        const parentDiv = this.listViewLink.locator('..');
        await expect.soft(parentDiv).toHaveClass(/switcher-active/);
    }

}
export { ProductCategoryPage };