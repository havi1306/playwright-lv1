import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { Billing } from "../models/billing";

class CheckoutPage extends BasePage {
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly companyName: Locator;
    readonly streetAddress: Locator;
    readonly city: Locator;
    readonly phoneNumber: Locator;
    readonly emailAddress: Locator;

    constructor(page: Page) {
        super(page);
        this.firstName = page.getByRole('textbox', { name: 'First name *' });
        this.lastName = page.getByRole('textbox', { name: 'Last name *' });
        this.companyName = page.getByRole('textbox', { name: 'Company name (optional)' });
        this.streetAddress = page.getByRole('textbox', { name: 'Street address *' });
        this.city = page.getByRole('textbox', { name: 'Town / City *' });
        this.phoneNumber = page.getByRole('textbox', { name: 'Phone *' });
        this.emailAddress = page.getByRole('textbox', { name: 'Email address *' });
    }

    async shouldCheckoutPageDisplayed(): Promise<void> {
        await expect(this.page).toHaveURL(/.*checkout/);
    }

    async getBillingDetails(): Promise<Billing> {
        const firstName = await this.firstName.inputValue();
        const lastName = await this.lastName.inputValue();
        const companyName = await this.companyName.inputValue();
        const streetAddress = await this.streetAddress.inputValue();
        const city = await this.city.inputValue();
        const phoneNumber = await this.phoneNumber.inputValue();
        const emailAddress = await this.emailAddress.inputValue();

        return new Billing(
            firstName,
            lastName,
            companyName,
            streetAddress,
            city,
            phoneNumber,
            emailAddress
        );
    }

}
export { CheckoutPage }