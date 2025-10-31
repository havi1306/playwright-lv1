import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { Product } from "../models/product";
import { Billing } from "../models/billing";

class OrderStatusPage extends BasePage {
    readonly confirmationMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.confirmationMessage = page.getByText('Thank you. Your order has');
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

    async shouldOrderMutipleDetailsCorrect(products: Product[]): Promise<void> {
        for (const product of products) {
            await this.shouldOrderDetailsCorrect(product);
        }
    }

    async shouldConfirmationMessageDisplayed(): Promise<void> {
        await expect(this.confirmationMessage).toBeVisible();
    }

    async shouldBillingDetailsCorrect(billing: Billing): Promise<void> {
        if (billing.firstName) expect(this.page.getByText(billing.firstName).first()).toBeVisible();
        if (billing.lastName) expect(this.page.getByText(billing.lastName).first()).toBeVisible();
        if (billing.companyName) expect(this.page.getByText(billing.companyName).first()).toBeVisible();
        if (billing.streetAddress) expect(this.page.getByText(billing.streetAddress).first()).toBeVisible();
        if (billing.city) expect(this.page.getByText(billing.city).first()).toBeVisible();
        if (billing.phoneNumber) expect(this.page.getByText(billing.phoneNumber).first()).toBeVisible();
        if (billing.emailAddress) expect(this.page.getByText(billing.emailAddress).first()).toBeVisible();
    }
}
export { OrderStatusPage }