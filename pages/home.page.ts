import { Locator, Page } from '@playwright/test'
import { BasePage } from './base.page';

class HomePage extends BasePage {
    readonly page: Page
    readonly closePopupButton: Locator
    readonly logInAndSignUpButton: Locator
    readonly allDepartmentsButton: Locator
    readonly cartIcon: Locator;
    readonly header: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page
        this.header = page.getByRole('banner');
        this.closePopupButton = page.getByRole('button', { name: 'Close' })
        this.logInAndSignUpButton = this.header.getByRole('link', { name: 'Log in / Sign up' })
        this.allDepartmentsButton = this.header.getByText('All departments')
        this.cartIcon = this.header.getByRole('link').filter({ hasText: '$' });
    }

    async navigateToHomePage(): Promise<void> {
        await this.navigateTo('https://demo.testarchitect.com/');
        await this.closePopupButton.click();
    }

    async clickCategoryLink(categoryName: string): Promise<void> {
        await this.allDepartmentsButton.hover();
        const categoryLink = this.page.getByRole('link', { name: categoryName });
        await categoryLink.click();
    }

    async selectElectronicComponentsCategory(): Promise<void> {
        await this.clickCategoryLink(" Electronic Components & Semiconductors");
    }

    async goToCart(): Promise<void> {
        await this.cartIcon.click();
    }

}

export { HomePage }