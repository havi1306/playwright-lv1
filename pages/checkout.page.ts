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

    async fillInBillingDetails(billingDetails: Billing): Promise<void> {
        if (billingDetails.firstName) await this.firstName.fill(billingDetails.firstName);
        if (billingDetails.lastName) await this.lastName.fill(billingDetails.lastName);
        if (billingDetails.companyName) await this.companyName.fill(billingDetails.companyName);
        if (billingDetails.streetAddress) await this.streetAddress.fill(billingDetails.streetAddress);
        if (billingDetails.city) await this.city.fill(billingDetails.city);
        if (billingDetails.phoneNumber) await this.phoneNumber.fill(billingDetails.phoneNumber);
        if (billingDetails.emailAddress) await this.emailAddress.fill(billingDetails.emailAddress);
    }

}
export { CheckoutPage }