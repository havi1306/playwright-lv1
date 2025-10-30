import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { Product } from "../models/product";

class ProductDetailPage extends BasePage {
    readonly addToCartButton: Locator;
    readonly productTitle: Locator;
    readonly productPrice: Locator;

    constructor(page: Page) {
        super(page);
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.productTitle = page.getByRole('heading', { level: 1 });
        this.productPrice = page.getByRole('paragraph').filter({ hasText: '$' });
    }

    async getProductTitle(): Promise<string> {
        return await this.productTitle.innerText();
    }

    async getProductPrice(): Promise<string> {
        return await this.productPrice.innerText();
    }

    async addToCart(): Promise<void> {
        await this.addToCartButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async getProduct(): Promise<Product> {
        return new Product(
            await this.getProductTitle(),
            await this.getProductPrice()
        );
    }

}
export { ProductDetailPage }