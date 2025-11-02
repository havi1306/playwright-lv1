import { expect, Locator, Page } from "@playwright/test";
import { Product } from "../models/product";
import { BasePage } from "./base.page";
import { promises } from "dns";

class CartPage extends BasePage {
    readonly checkoutButton: Locator;
    readonly clearShoppingCartButton: Locator;
    readonly cartEmptyMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.checkoutButton = page.getByRole('link', { name: 'PROCEED TO CHECKOUT' });
        this.clearShoppingCartButton = page.getByText('Clear shopping cart');
        this.cartEmptyMessage = page.getByRole('heading', { name: 'YOUR SHOPPING CART IS EMPTY' })
    }

    async shouldProductDetailsCorrect(product: Product): Promise<void> {
        await this.page
            .getByRole('row')
            .filter({
                has: this.page.getByRole('cell')
                    .filter({ has: this.page.getByRole('link', { name: product.productTitle }) })
            })
            .getByRole('cell', { name: product.productPrice })
            .isVisible();
    }

    async proceedToCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    async shouldMutipleProductDetailsCorrect(products: Product[]): Promise<void> {
        for (const product of products) {
            await this.shouldProductDetailsCorrect(product);
        }
    }

    async clearShoppingCart(): Promise<void> {
        await this.clearShoppingCartButton.click();
        this.page.on('dialog', dialog => dialog.accept());
    }

    async shouldCartEmtyMessageDisplayed(): Promise<void> {
        await expect(this.cartEmptyMessage).toBeVisible();
    }

}
export { CartPage }