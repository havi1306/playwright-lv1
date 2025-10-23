import { Locator, Page } from '@playwright/test'
import { BasePage } from './base.page'

class MyAccountPage extends BasePage {
    readonly page: Page
    readonly userNameTextbox: Locator
    readonly passwordTextbox: Locator
    readonly logInButton: Locator

    constructor(page: Page) {
        super(page);
        this.page = page
        this.userNameTextbox = page.getByRole('textbox', { name: 'Username or email address *' })
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password *' })
        this.logInButton = page.getByRole('button', { name: 'Log in' })
    }

    async logIn(username: string, password: string): Promise<void> {
        await this.userNameTextbox.fill(username);
        await this.passwordTextbox.fill(password);
        await this.logInButton.click();
    }

}
export { MyAccountPage }    