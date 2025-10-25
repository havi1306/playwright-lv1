import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { Product } from "../models/product";
import { Billing } from "../models/billing";

class OrderStatusPage extends BasePage {
    readonly placeOrderButton;
    readonly confirmationMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.placeOrderButton = page.getByRole('button', { name: 'Place order' });
        this.confirmationMessage = page.getByText('Thank you. Your order has');
    }

    async placeOrder(): Promise<void> {
        await this.placeOrderButton.click();
    }

    async shouldOrderStatusPageDisplayed(): Promise<void> {
        await expect(this.page).toHaveURL(/.*order-received/, { timeout: 20000 });
    }

    async shouldOrderDetailsCorrect(product: Product): Promise<void> {
        await this.page
            .getByRole('row')
            .filter({
                has: this.page.getByRole('cell')
                    .filter({ has: this.page.getByRole('link', { name: product.productTitle }) })
            })
            .getByRole('cell', { name: product.productPrice })
            .isVisible();
    }

    async shouldConfirmationMessageDisplayed(): Promise<void> {
        await expect(this.confirmationMessage).toBeVisible();
    }

    async shouldBillingDetailsCorrect(billing: Billing): Promise<void> {
        await expect(this.page.getByText(billing.firstName).first()).toBeVisible();
        await expect(this.page.getByText(billing.lastName).first()).toBeVisible();
        await expect(this.page.getByText(billing.companyName).first()).toBeVisible();
        await expect(this.page.getByText(billing.streetAddress).first()).toBeVisible();
        await expect(this.page.getByText(billing.city).first()).toBeVisible();
        await expect(this.page.getByText(billing.phoneNumber).first()).toBeVisible();
        await expect(this.page.getByText(billing.emailAddress).first()).toBeVisible();
    }
}
export { OrderStatusPage }