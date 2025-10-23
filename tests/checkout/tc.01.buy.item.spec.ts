import { expect, test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { MyAccountPage } from '../../pages/my.account.page';
import { ProductCategoryPage } from '../../pages/product.category.page';
import { ProductDetailPage } from '../../pages/product.detail.page';
import { CartPage } from '../../pages/cart.page';

test('TC01 | Verify users can buy an item successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    const myAccountPage = new MyAccountPage(page);
    const productCategoryPage = new ProductCategoryPage(page);
    const productDetailPage = new ProductDetailPage(page);
    const cartPage = new CartPage(page);

    await homePage.navigateToHomePage();
    await myAccountPage.logIn('vi.pham@aget.vn', 'havi123');
    await homePage.selectElectronicComponentsCategory;
    await productCategoryPage.shouldGridViewDisplayed();
    await productCategoryPage.clickListView();
    await productCategoryPage.shouldListViewDisplayed();
    await productCategoryPage.selectRandomProduct();
    await productDetailPage.addToCart();
    const product = await productDetailPage.getProduct();
    await homePage.goToCart();
    await cartPage.shouldProductDetailsCorrect(product);




})      
