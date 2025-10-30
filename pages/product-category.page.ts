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
        this.gridViewLink = page.locator('.switcher-active').getByRole('link', { name: ' Grid' });
        this.listViewLink = page.locator('.switcher-active').getByRole('link', { name: ' List' });
        this.productItems = page.getByRole('heading', { level: 2 });
    }

    async shouldGridViewDisplayed(): Promise<void> {
        await expect.soft(this.gridViewLink).toBeVisible();
    }

    async switchViewTo(view: 'List' | 'Grid'): Promise<void> {
        await this.page.locator(`.switch-${view.toLowerCase()}`).click();
    }

    async selectRandomProduct(): Promise<void> {
        const productCount = await this.productItems.count();
        await this.productItems.nth(await getRandomIndex(productCount)).click();
    }

    async shouldListViewDisplayed(): Promise<void> {
        await expect.soft(this.listViewLink).toBeVisible;
    }

}
export { ProductCategoryPage };