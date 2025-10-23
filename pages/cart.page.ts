import { Page } from "@playwright/test";
import { Product } from "../model/product";

class CartPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
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
}
export { CartPage }