import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from './base.page';
import { getRandomIndex } from '../utils/utils';
import { Product } from '../models/product';
import { SortType } from '../data/sort-type.enum';

class ProductCategoryPage extends BasePage {
    readonly products: Locator;
    readonly gridViewLink: Locator;
    readonly listViewLink: Locator;
    readonly productItems: Locator;
    readonly sortCombobox: Locator;

    constructor(page: Page) {
        super(page);
        this.products = page.locator('.products');
        this.gridViewLink = page.locator('.switcher-active').getByRole('link', { name: ' Grid' });
        this.listViewLink = page.locator('.switcher-active').getByRole('link', { name: ' List' });
        this.productItems = page.getByRole('heading', { level: 2 });
        this.sortCombobox = page.getByLabel('Shop order');
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

    async addMutipleProducts(numberOfItems: number): Promise<Product[]> {
        await this.page.waitForLoadState('networkidle');
        const selectedProducts: Product[] = [];

        const productItems = this.page.locator('.product-details');
        const totalProducts = await productItems.count();

        if (numberOfItems > totalProducts) {
            throw new Error(`Cannot select ${numberOfItems} items. Only ${totalProducts} items available on the page.`);
        }

        for (let i = 0; i < numberOfItems; i++) {
            const productCard = productItems.nth(i);
            const product = await this.getProduct(productCard);
            selectedProducts.push(product);
            await productCard.getByRole('link', { name: /^Add\s+[“"](.+?)[”"]\s+to your cart$/i }).click();
            await this.page.waitForLoadState('networkidle');
        }
        return selectedProducts;
    }

    async getProduct(product: Locator): Promise<Product> {
        const name = await product.getByRole('heading').innerText()
        const price = await product.locator('.amount').last().innerText()
        return new Product(name, price);
    }

    async shouldOrderOfItemsSortCorrect(type: SortType): Promise<void> {
        const totalProducts: number = await this.products.count();
        for (let i = 0; i < totalProducts - 1; i++) {
            const fristPrice = await this.products.nth(i).locator('.amount').last().innerText()
            const fristPriceNumber = parseFloat(fristPrice.replace(/[^0-9.-]+/g, ''))
            const secondPrice = await this.products.nth(i + 1).locator('.amount').last().innerText()
            const secondPriceNumber = parseFloat(secondPrice.replace(/[^0-9.-]+/g, ''))
            switch (type) {
                case SortType.PRICE_LOW_TO_HIGH: expect(fristPriceNumber <= secondPriceNumber).toBeTruthy();
                case SortType.PRICE_HIGH_TO_LOW: expect(fristPriceNumber >= secondPriceNumber).toBeTruthy();
            }
        }
    }

    async sortBy(type: SortType): Promise<void> {
        await this.page.waitForLoadState('networkidle');
        await this.sortCombobox.selectOption({ label: type });
    }
}
export { ProductCategoryPage };