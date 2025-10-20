import { expect, test } from '@playwright/test';
import { HomePage } from '../../pages/home-page';
import { MyAccountPage } from '../../pages/my-account-page';
import { ProductCategoryPage } from '../../pages/product-category-page';

test('TC01_Verify users can buy an item successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    const myAccountPage = new MyAccountPage(page);
    const productCategoryPage = new ProductCategoryPage(page);

    await page.goto('');
    await homePage.closePopupButton.click();
    await homePage.logInAndSignUpButton.click();
    await myAccountPage.userNameTextbox.fill('vi.pham@aget.vn');
    await myAccountPage.passwordTextbox.fill('havi123');
    await myAccountPage.logInButton.click();
    await homePage.allDepartmentsButton.hover();
    await homePage.electronicComponentsLink.click();
    expect(productCategoryPage.isGridView()).toBeTruthy();
    await productCategoryPage.listViewButton.click();
    expect(productCategoryPage.isGridView()).toBeFalsy();


}) 