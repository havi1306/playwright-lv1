import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from './base.page'

class MyAccountPage extends BasePage {

    readonly userNameTextbox: Locator
    readonly passwordTextbox: Locator
    readonly logInButton: Locator
    readonly ordersButton: Locator

    constructor(page: Page) {
        super(page);
        this.userNameTextbox = page.getByRole('textbox', { name: 'Username or email address *' })
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password *' })
        this.logInButton = page.getByRole('button', { name: 'Log in' })
        this.ordersButton = page.getByRole('link', { name: ' Orders' })
    }

    async logIn(username: string, password: string): Promise<void> {
        await this.userNameTextbox.fill(username);
        await this.passwordTextbox.fill(password);
        await this.logInButton.click();
    }

    async goToOrders(): Promise<void> {
        await this.ordersButton.click();
    }

    async shouldOrderDisplayed(orderNumber: string): Promise<void> {
        await expect(this.page.getByRole('cell').filter({ hasText: orderNumber })).toBeVisible();
    }

}
export { MyAccountPage }    