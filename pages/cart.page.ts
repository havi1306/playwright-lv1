import { expect, Locator, Page } from "@playwright/test";
import { Product } from "../models/product";
import { BasePage } from "./base.page";
import { promises } from "dns";

class CartPage extends BasePage {
    readonly checkoutButton: Locator;
    readonly clearShoppingCartButton: Locator;
    readonly cartEmptyMessage: Locator;
    readonly productLoading: Locator;

    constructor(page: Page) {
        super(page);
        this.checkoutButton = page.getByRole('link', { name: 'PROCEED TO CHECKOUT' });
        this.clearShoppingCartButton = page.getByText('Clear shopping cart');
        this.cartEmptyMessage = page.getByRole('heading', { name: 'YOUR SHOPPING CART IS EMPTY' })
        this.productLoading = page.locator('.blockUI.blockOverlay').first();
    }

    async waitingForProductLoading(): Promise<void> {
        await this.productLoading.waitFor({ state: "visible" });
        await this.productLoading.waitFor({ state: "hidden" });
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

    getProductRow(productTitle: string): Locator {
        return this.page.getByRole('row').filter({ has: this.page.getByRole('link', { name: productTitle }) })
    }

    async shouldQuantityAndSubTotalCorrect(product: Product): Promise<void> {
        await expect(this.getProductRow(product.productTitle).getByRole('spinbutton'))
            .toHaveValue(product.productQuantity.toString(),);
        await expect(this.getProductRow(product.productTitle).getByRole('cell').last())
            .toHaveText(product.getSubTotal().toString());
    }

    async plusProduct(product: Product): Promise<void> {
        product.productQuantity += 1;
        await this.getProductRow(product.productTitle).locator('.plus').click();
        await this.waitingForProductLoading()
    }

    async enterQuantityTextbox(product: Product, quantity: number): Promise<void> {
        product.productQuantity = quantity;
        await this.getProductRow(product.productTitle).getByRole('spinbutton').fill(quantity.toString());
        await this.getProductRow(product.productTitle).getByRole('spinbutton').press('Enter');
        await this.waitingForProductLoading()
    }

    async minusProduct(product: Product): Promise<void> {
        product.productQuantity -= 1;
        await this.getProductRow(product.productTitle).locator('.minus').click();
        await this.waitingForProductLoading()
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

    async shouldCartEmptyMessageDisplayed(): Promise<void> {
        await expect(this.cartEmptyMessage).toBeVisible();
    }

}
export { CartPage }