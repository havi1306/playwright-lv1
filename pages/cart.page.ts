import { Page } from "@playwright/test";
import { Product } from "../models/product";
import { BasePage } from "./base.page";

class CartPage extends BasePage {
    readonly checkoutButton;

    constructor(page: Page) {
        super(page);
        this.checkoutButton = page.getByRole('link', { name: 'PROCEED TO CHECKOUT' })
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
}
export { CartPage }