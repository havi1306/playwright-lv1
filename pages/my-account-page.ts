import { Locator, Page } from '@playwright/test'

export class MyAccountPage {
    readonly page: Page
    readonly userNameTextbox: Locator
    readonly passwordTextbox: Locator
    readonly logInButton: Locator

    constructor(page: Page) {
        this.page = page
        this.userNameTextbox = page.getByRole('textbox', { name: 'Username or email address *' })
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password *' })
        this.logInButton = page.getByRole('button', { name: 'Log in' })
    }
}