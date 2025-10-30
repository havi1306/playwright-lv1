import { Locator, Page } from '@playwright/test'
import { BasePage } from './base.page';

class HomePage extends BasePage {
    readonly closePopupButton: Locator
    readonly logInAndSignUpButton: Locator
    readonly allDepartmentsButton: Locator
    readonly cartIcon: Locator;
    readonly header: Locator;

    constructor(page: Page) {
        super(page);
        this.header = page.getByRole('banner');
        this.closePopupButton = page.getByRole('button', { name: 'Close' })
        this.logInAndSignUpButton = this.header.getByRole('link', { name: 'Log in / Sign up' })
        this.allDepartmentsButton = this.header.getByText('All departments')
        this.cartIcon = this.header.getByRole('link').filter({ hasText: '$' });
    }

    async navigateToHomePage(): Promise<void> {
        await this.navigateTo('');
        await this.closePopupButton.click();
    }

    async clickCategoryLink(categoryName: string): Promise<void> {
        await this.page.waitForLoadState('networkidle');
        await this.allDepartmentsButton.hover();
        const categoryLink = this.page.getByRole('link', { name: categoryName });
        await categoryLink.click();
    }

    async selectElectronicComponentsCategory(): Promise<void> {
        await this.clickCategoryLink(" Electronic Components & Supplies");
    }

    async goToCart(): Promise<void> {
        await this.cartIcon.click();
    }

    async goToMyAccount(): Promise<void> {
        await this.logInAndSignUpButton.click();
    }

}

export { HomePage }