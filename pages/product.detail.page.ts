import { _android, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { Product } from "../model/product";

class ProductDetailPage extends BasePage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly productTitle: Locator;
    readonly productPrice: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.productTitle = page.getByRole('heading');
        this.productPrice = page.getByRole('paragraph');
    }

    getProductTitle(): Promise<string> {
        return this.productTitle.innerText();
    }

    getProductPrice(): Promise<string> {
        return this.productPrice.innerText();
    }

    async addToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    async getProduct(): Promise<Product> {
        return new Product(
            await this.getProductTitle(),
            await this.getProductPrice()
        );
    }

}
export { ProductDetailPage }