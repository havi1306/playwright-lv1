import { Locator, Page } from '@playwright/test'

export class HomePage {
    readonly page: Page
    readonly closePopupButton: Locator
    readonly logInAndSignUpButton: Locator
    readonly allDepartmentsButton: Locator
    readonly electronicComponentsLink: Locator

    constructor(page: Page) {
        this.page = page
        this.closePopupButton = page.getByRole('button', { name: 'Close' })
        this.logInAndSignUpButton = page.getByRole('link', { name: 'Log in / Sign up' })
        this.allDepartmentsButton = page.getByText('All departments')
        this.electronicComponentsLink = page.getByRole('link', { name: ' Electronic Components &' })
    }
}