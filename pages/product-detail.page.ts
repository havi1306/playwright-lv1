import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { Product } from "../models/product";

class ProductDetailPage extends BasePage {
    readonly addToCartButton: Locator;
    readonly productTitle: Locator;
    readonly productPrice: Locator;
    readonly reviewButton: Locator;
    readonly reviewTextbox: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        super(page);
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.productTitle = page.getByRole('heading', { level: 1 });
        this.productPrice = page.getByRole('paragraph').filter({ hasText: '$' });
        this.reviewButton = page.getByRole('link').filter({ hasText: 'Reviews' });
        this.reviewTextbox = page.getByRole('textbox', { name: 'Your review *' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
    }

    async goToReview(): Promise<void> {
        await this.reviewButton.click();
    }

    async enterReview(content: string): Promise<void> {
        await this.reviewTextbox.fill(content);
    }

    async clickSubmitButton(): Promise<void> {
        await this.submitButton.click();
    }

    async submitReview(content: string, rating: number): Promise<void> {
        await this.clickStar(rating);
        await this.enterReview(content);
        await this.clickSubmitButton();
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

    async clickStar(rating: number): Promise<void> {
        if (rating < 1 || rating > 5) {
            throw new Error('Rating must be between 1 and 5');
        }

        const star = this.page.getByRole('paragraph').filter({ hasText: '1 2 3 4 5' }).getByRole('link').filter({ hasText: rating.toString() })
        await star.click();
    }

    async shouldReviewSuccessfullyDisplayed(content: string, rating: number): Promise<void> {
        await expect(this.page.getByTestId('comments').getByRole('listitem').getByRole('paragraph').filter({ hasText: content })).toBeVisible();
        await expect(
            this.page.getByTestId('comments')
                .getByRole('listitem')
                .filter({ hasText: content })
                .filter({ has: this.page.getByRole('strong').filter({ hasText: rating.toString() }) })
        ).toBeVisible();
    }

    async shouldNumberOfReviewsCorrect(numberOfReviews: number): Promise<void> {
        await expect(this.page.getByRole('link', { name: `Reviews (${numberOfReviews})` })).toBeVisible();
    }

    async getNumberOfReviews(): Promise<number> {
        const reviewText = await this.reviewButton.textContent();
        const match = reviewText?.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
    }
}
export { ProductDetailPage }