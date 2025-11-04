import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { Billing } from "../models/billing";

class CheckoutPage extends BasePage {
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly companyName: Locator;
    readonly country: Locator;
    readonly streetAddress: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly zipCode: Locator;
    readonly phoneNumber: Locator;
    readonly emailAddress: Locator;
    readonly placeOrderButton: Locator;

    constructor(page: Page) {
        super(page);
        this.firstName = page.getByRole('textbox', { name: 'First name *' });
        this.lastName = page.getByRole('textbox', { name: 'Last name *' });
        this.companyName = page.getByRole('textbox', { name: 'Company name (optional)' });
        this.country = page.getByTestId('billing_country')
        this.streetAddress = page.getByRole('textbox', { name: 'Street address *' });
        this.city = page.getByRole('textbox', { name: 'Town / City *' });
        this.state = page.getByTestId('billing_state');
        this.zipCode = page.getByRole('textbox', { name: 'ZIP Code *' });
        this.phoneNumber = page.getByRole('textbox', { name: 'Phone *' });
        this.emailAddress = page.getByRole('textbox', { name: 'Email address *' });
        this.placeOrderButton = page.getByRole('button', { name: 'Place order' });
    }

    async placeOrder(): Promise<void> {
        await this.placeOrderButton.click();
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
        await this.firstName.clear();
        if (billingDetails.firstName) await this.firstName.fill(billingDetails.firstName);

        await this.lastName.clear();
        if (billingDetails.lastName) await this.lastName.fill(billingDetails.lastName);

        await this.companyName.clear();
        if (billingDetails.companyName) await this.companyName.fill(billingDetails.companyName);

        if (billingDetails.country) await this.country.selectOption({ label: billingDetails.country });

        await this.streetAddress.clear();
        if (billingDetails.streetAddress) await this.streetAddress.fill(billingDetails.streetAddress);

        await this.city.clear();
        if (billingDetails.city) await this.city.fill(billingDetails.city);

        if (billingDetails.state) await this.state.selectOption({ label: billingDetails.state });

        await this.zipCode.clear();
        if (billingDetails.zipCode) await this.zipCode.fill(billingDetails.zipCode);

        await this.phoneNumber.clear();
        if (billingDetails.phoneNumber) await this.phoneNumber.fill(billingDetails.phoneNumber);

        await this.emailAddress.clear();
        if (billingDetails.emailAddress) await this.emailAddress.fill(billingDetails.emailAddress);
    }

    async selectPaymentMethod(paymenntMethod: string): Promise<void> {
        await this.page.getByRole('radio', { name: paymenntMethod }).click();
    }

    async shouldRequiredFieldShowErrorMessages(billing: Billing): Promise<void> {
        if (!billing.firstName) await this.shouldRequiredFieldErrorVisible('First name');
        if (!billing.lastName) await this.shouldRequiredFieldErrorVisible('Last name');
        if (!billing.streetAddress) await this.shouldRequiredFieldErrorVisible('Street address');
        if (!billing.city) await this.shouldRequiredFieldErrorVisible('Town / City');
        if (!billing.zipCode) await this.shouldRequiredFieldErrorVisible('ZIP Code');
        if (!billing.phoneNumber) await this.shouldRequiredFieldErrorVisible('Phone');
        if (!billing.emailAddress) await this.shouldRequiredFieldErrorVisible('Email address');
    }

    async shouldRequiredFieldErrorVisible(fieldName: String): Promise<void> {
        await expect(this.page.getByText(`${fieldName} is a required field.`)).toBeVisible();
    }

    async shouldRequiredFieldHighlighted(billing: Billing): Promise<void> {
        if (!billing.firstName) await expect(this.page.getByRole('paragraph').filter({ has: this.firstName })).toHaveClass(/woocommerce-invalid/);
        if (!billing.lastName) await expect(this.page.getByRole('paragraph').filter({ has: this.lastName })).toHaveClass(/woocommerce-invalid/);
        if (!billing.streetAddress) await expect(this.page.getByRole('paragraph').filter({ has: this.streetAddress })).toHaveClass(/woocommerce-invalid/);
        if (!billing.city) await expect(this.page.getByRole('paragraph').filter({ has: this.city })).toHaveClass(/woocommerce-invalid/);
        if (!billing.zipCode) await expect(this.page.getByRole('paragraph').filter({ has: this.zipCode })).toHaveClass(/woocommerce-invalid/);
        if (!billing.phoneNumber) await expect(this.page.getByRole('paragraph').filter({ has: this.phoneNumber })).toHaveClass(/woocommerce-invalid/);
        if (!billing.emailAddress) await expect(this.page.getByRole('paragraph').filter({ has: this.emailAddress })).toHaveClass(/woocommerce-invalid/);
    }
}
export { CheckoutPage }